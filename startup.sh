#!/bin/bash
set -e

if [ ! -f "data/documents.pkl" ] || [ ! -f "data/bm25_index.pkl" ]; then
    echo "Generating BM25 index..."
    python << 'PYEOF'
import os, pickle
os.makedirs("data", exist_ok=True)
from retrievers.bm25 import create_document, create_bm25
doc = create_document()
pickle.dump(doc, open("data/documents.pkl", "wb"))
bm25 = create_bm25()
pickle.dump(bm25, open("data/bm25_index.pkl", "wb"))
print("Done")
PYEOF
fi

exec uvicorn api.main:app --host 0.0.0.0 --port ${PORT:-8000}
