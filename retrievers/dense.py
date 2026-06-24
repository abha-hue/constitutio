from sentence_transformers import SentenceTransformer
from pinecone import Pinecone
import os
from dotenv import load_dotenv

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
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index = pc.Index("constituto")
results = index.query(
    vector=query_embedding,
    top_k=5,
    include_metadata=True
)

for match in results.matches:
    print(f"Score: {match.score}")
    print(f"Article: {match.metadata['article']}")
    print(f"Title: {match.metadata['title']}")
    print("-" * 50)