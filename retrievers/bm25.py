from rank_bm25 import BM25Okapi
import chunker
import pandas as pd

df = pd.read_csv("Constitution of India.csv")

def create_document():
    document = []
    for _, row in df.iterrows():
        text = (
                f"Title: {row['title']} \n "
                f"Article: {row['article']} \n\n "
                f"{row['description']}"
                )
        document.append(
            {
                "text": text,
                "metadata": {
                    "source": "Constitution of India",
                    "title": row["title"],
                    "article": row["article"],
                },
            }
        )

    return document


document = create_document()
def create_bm25():
    corpus = [
        f''' Title: {doc['metadata']['title']} Article: {doc['metadata']['article']} {doc['text']}'''
        for doc in document
    ]
    
    tokenized_corpus = [doc.lower().split(" ") for doc in corpus]
    print(tokenized_corpus[0])
    bm_25 = BM25Okapi(tokenized_corpus)
    print(bm_25)
    return bm_25

bm_25 = create_bm25()

query = "Preamble"

tokenized_query = query.lower().split()

scores = bm_25.get_scores(tokenized_query)

print(scores)
    


