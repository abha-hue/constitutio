from pinecone import Pinecone
from dotenv import load_dotenv
import pickle
import os
import numpy as np
from embeddings.model import model
from reranker.cross_encoder import encoderModel

load_dotenv()


# Load BM25 and documents
documents = pickle.load(open("data/documents.pkl", "rb"))
bm25 = pickle.load(open("data/bm25_index.pkl", "rb"))

# Connect to Pinecone
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index = pc.Index("constituto")

def dense_retrieval(query):
    query_embedding = model.encode(query).tolist()
    results = index.query(
        vector=query_embedding,
        top_k=10,
        include_metadata=True
    )
    dense_results = []
    
    for match in results.matches:
        dense_results.append({
            "id" : match.id,
            "text": match.metadata['text'],
            "score": match.score,
            "article": match.metadata['article'],
            "title": match.metadata['title']
        })
    return dense_results


def bm25_retrieval(query, top_k=5):
    tokenized_query = query.lower().split()

    scores = bm25.get_scores(tokenized_query)

    top_indices = np.argsort(scores)[::-1][:10]

    bm25_results = []

    for idx in top_indices:
        doc = documents[idx]

        bm25_results.append({
            "id": doc["id"],
            "text": doc["text"],
            "score": float(scores[idx]),
            "article": doc["metadata"]["article"],
            "title": doc["metadata"]["title"],
        })
    return bm25_results
    

def normalize_scores(results):
    scores = [result["score"] for result in results]
    min_score = min(scores)
    max_score = max(scores)
    
    for result in results:
        if max_score - min_score == 0:
            result["normalized_score"] = 1.0
        else:
            result["normalized_score"] = (result["score"] - min_score) / (max_score - min_score)


def merge_results(dense_results, bm25_results, alpha=0.5):
    merged_results = {}
    
    for result in dense_results:
        merged_results[result["id"]] = {
            "text": result["text"],
            "article": result["article"],
            "title": result["title"],
            "score": alpha * result["normalized_score"]
        }
    
    for result in bm25_results:
        if result["id"] in merged_results:
            merged_results[result["id"]]["score"] += (1 - alpha) * result["normalized_score"]
        else:
            merged_results[result["id"]] = {
                "text": result["text"],
                "article": result["article"],
                "title": result["title"],
                "score": (1 - alpha) * result["normalized_score"]
            }
    
    return sorted(merged_results.values(), key=lambda x: x["score"], reverse=True)



def reranker(merged_results, query):
    rerank_doc = []
    pairs = []
    for result in merged_results:
        rerank_doc.append((result["text"], result["article"], result["title"]))
    
    for doc in rerank_doc:
        pairs.append((query, doc[0]))
    
    model_scores = encoderModel.predict(pairs)
    for i, result in enumerate(merged_results):
        result["rerank_score"] = model_scores[i]
    
    return sorted(merged_results, key=lambda x: x["rerank_score"], reverse=True)

