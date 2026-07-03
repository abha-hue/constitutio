from rank_bm25 import BM25Okapi
import chunker
import pandas as pd
import pickle

df = pd.read_csv("Constitution of India.csv")

def create_document():
    document = []
    for _, row in df.iterrows():
        text = (
            f"Title: {row['title']}\n"
            f"Article: {row['article']}\n\n"
            f"{str(row['description']).strip()}"
        )

        document.append(
            {
                "id": f"article_{row['article']}",
                "text": text,
                "metadata": {
                    "text": text,
                    "source": "Constitution of India",
                    "title": str(row["title"]).strip(),
                    "article": str(row["article"]).strip(),
                },
            }
        )

    return document


document = create_document()

with open("data/documents.pkl", "wb") as f:
    pickle.dump(document, f)


def create_bm25():
    corpus = [
        f''' Title: {doc['metadata']['title']} Article: {doc['metadata']['article']} {doc['text']}'''
        for doc in document
    ]
    
    tokenized_corpus = [doc.lower().split(" ") for doc in corpus]
    print(tokenized_corpus[0])
    bm_25 = BM25Okapi(tokenized_corpus)
    return bm_25

bm_25 = create_bm25()

with open("data/bm25_index.pkl", "wb") as f:
    pickle.dump(bm_25, f)

query = "Preamble"

tokenized_query = query.lower().split()

scores = bm_25.get_scores(tokenized_query)

print(scores[0 : 5])
    


