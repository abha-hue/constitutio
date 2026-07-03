from pinecone import Pinecone
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv
import pickle
import os
import numpy as np

load_dotenv()

# Load embedding model
# model = SentenceTransformer("all-MiniLM-L6-v2")
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
        top_k=5,
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

dense_results = dense_retrieval("preamble")
bm25_results = bm25_retrieval("preamble")

normalize_scores(dense_results)
normalize_scores(bm25_results)

    
