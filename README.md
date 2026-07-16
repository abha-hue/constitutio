# Constitutio

Constitutio is a Retrieval-Augmented Generation (RAG) project for the Indian Constitution. It is built from scratch without LangChain or any other high-level RAG framework.

The project loads constitutional content from a CSV dataset, creates embeddings, and prepares the foundation for retrieval, reranking, and answer generation over constitutional text.

## What this project does

- Loads constitutional data from the dataset file
- Converts constitutional entries into document chunks with metadata
- Generates embeddings using Sentence Transformers
- Stores embeddings for later retrieval
- Provides a starting point for custom retrieval, reranking, and LLM-based generation pipelines

## Project structure

- `frontend/` - Next.js web application providing the beautiful landing page and chat interface
- `api/` - API entry points for serving the RAG workflow
- `ingestion/` - Data loading and chunking logic
- `retrievers/` - Retrieval strategies such as BM25, dense retrieval, and hybrid retrieval
- `reranker/` - Cross-encoder reranking logic
- `llm/` - LLM generation layer
- `data/` - Local data storage
- `embeddings/` - Embedding artifacts
- `eval.py` - Evaluation entry point
- `Constitution of India.csv` - Source dataset

## Current workflow

The project consists of an end-to-end RAG backend and a modern web interface:

1. **Backend**: Reads constitutional records from the CSV file, chunks them, generates sentence embeddings, and handles user queries using a custom retrieval/reranking process.
2. **Frontend**: A sleek Next.js application that provides a landing page and chat interface for interacting with the backend.

## Setup

### 1. Backend (Python)

**Prerequisites:**
- Python 3.9+

**Installation:**
```bash
python -m venv .venv
# Mac/Linux:
source .venv/bin/activate
# Windows PowerShell:
.\.venv\Scripts\Activate.ps1

pip install -r requirements.txt # (or pip install pandas sentence-transformers fastapi uvicorn etc.)
```

**Run the ingestion pipeline:**
```bash
python ingestion/chunker.py
```
This script reads the Constitution dataset and creates embeddings for the text entries.

### 2. Frontend (Next.js)

**Prerequisites:**
- Node.js (v18+)

**Installation:**
```bash
cd frontend
npm install
```

**Run the development server:**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Notes

- The retrieval, reranking, and generation components are intentionally implemented from scratch rather than using high-level frameworks like LangChain.
- The UI features a custom design system with dynamic animations, glassmorphism, and responsive layouts.
