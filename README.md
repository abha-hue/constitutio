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

- api/ - API entry points for serving the RAG workflow
- ingestion/ - Data loading and chunking logic
- retrievers/ - Retrieval strategies such as BM25, dense retrieval, and hybrid retrieval
- reranker/ - Cross-encoder reranking logicpyht
- llm/ - LLM generation layer
- data/ - Local data storage
- embeddings/ - Embedding artifacts
- eval.py - Evaluation entry point
- Constitution of India.csv - Source dataset

## Current workflow

The current implementation focuses on ingestion and embedding generation:

1. Read constitutional records from the CSV file
2. Extract the text and metadata fields
3. Generate sentence embeddings with a local transformer model
4. Save the embeddings to embeddings.csv

## Setup

### Prerequisites

- Python 3.9+
- pip

### Install dependencies

```bash
pip install pandas sentence-transformers
```

### Create a virtual environment (recommended)

```bash
python -m venv .venv
source .venv/bin/activate
```

On Windows PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

## Run the ingestion pipeline

```bash
python ingestion/chunker.py
```

This script reads the Constitution dataset and creates embeddings for the text entries.

## Notes

- This repository is still under active development.
- The retrieval, reranking, and generation components are scaffolded and can be expanded into a complete end-to-end RAG system.
- The project is intentionally implemented from scratch rather than using LangChain.

## Future scope

Possible next steps for the project:

- Build a working retrieval API
- Add BM25 and dense retrieval comparison
- Implement reranking for better context selection
- Connect the retrieved chunks to an LLM for grounded answers
- Add evaluation metrics for retrieval quality
