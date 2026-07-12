from fastapi import FastAPI
from embeddings.model import model
from retrievers.hybrid import hybrid_retrieval
from reranker.cross_encoder import encoderModel
app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}