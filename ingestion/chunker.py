import pandas as pd
from sentence_transformers import SentenceTransformer


df = pd.read_csv("Constitution of India.csv")
document = []


def create_embeddings():
    for _, row in df.iterrows():
        text = text = f"""
            Title: {row['title']}
            Article: {row['article']}

            {row['description']}
            """
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

    model = SentenceTransformer("all-MiniLM-L6-v2")
    texts = [doc["text"] for doc in document]

    embeddings = model.encode(
        texts,
        convert_to_numpy=True,
        show_progress_bar=True,
    )
    return embeddings


