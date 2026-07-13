from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from llm.generator import generate_response

app = FastAPI(
    title="Constitution RAG API",
    version="1.0.0",
    description="Hybrid Search RAG for the Constitution of India"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Request Model
# -----------------------------

class QueryRequest(BaseModel):
    query: str


# -----------------------------
# Root Endpoint
# -----------------------------

@app.get("/")
async def root():
    return {
        "message": "Constitution RAG API is running 🚀"
    }


# -----------------------------
# Health Check
# -----------------------------

@app.get("/health")
async def health():
    return {
        "status": "healthy"
    }


# -----------------------------
# Chat Endpoint
# -----------------------------

@app.post("/chat")
async def chat(request: QueryRequest):

    try:
        answer = generate_response(request.query)

        return {
            "query": request.query,
            "answer": answer
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }