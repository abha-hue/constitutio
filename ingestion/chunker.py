import pandas as pd
from sentence_transformers import SentenceTransformer

df = pd.read_csv("Constitution of India.csv")

documents = []


def create_embeddings():
    model = SentenceTransformer("all-MiniLM-L6-v2")

    texts = []

    for _, row in df.iterrows():
        text = (
            f"Title: {row['title']}\n"
            f"Article: {row['article']}\n\n"
            f"{str(row['description']).strip()}"
        )

        documents.append(
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

        texts.append(text)

    embeddings = model.encode(
        texts,
        convert_to_numpy=True,
        show_progress_bar=True,
    )

    return documents, embeddings