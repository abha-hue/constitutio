from pinecone import Pinecone
import os
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
import pickle
load_dotenv()

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

query = (
    "preamble"
)

query_embedding = model.encode(
    query
).tolist()

documents = pickle.load(open("data/documents.pkl", "rb"))
bm_25 = pickle.load(open("data/bm25_index.pkl", "rb"))

pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index = pc.Index("constituto")
results = index.query(
    vector=query_embedding,
    top_k=10,
    include_metadata=True
)

dense_results = []

for match in results.matches:
    dense_results.append(
        {
            "id": match.id,
            "score": match.score,
            "metadata": match.metadata,
            "title": match.metadata["title"],
            "article": match.metadata["article"]
        }
    )