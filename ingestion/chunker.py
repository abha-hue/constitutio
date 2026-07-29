import os
import time
import pandas as pd
import cohere
from dotenv import load_dotenv

load_dotenv()

co = cohere.ClientV2(api_key=os.getenv("CO_API_KEY"))

df = pd.read_csv("Constitution of India.csv")

documents = []

BATCH_SIZE = 96
SLEEP_SECONDS = 30  # Increase if you still hit 429s


def create_embeddings():
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

    embeddings = []

    for i in range(0, len(texts), BATCH_SIZE):
        batch = texts[i:i + BATCH_SIZE]

        embed_input = [
            {
                "content": [
                    {
                        "type": "text",
                        "text": text,
                    }
                ]
            }
            for text in batch
        ]

        response = co.embed(
            inputs=embed_input,
            model="embed-v4.0",
            input_type="search_document",
            embedding_types=["float"],
            output_dimension=512,
        )

        embeddings.extend(response.embeddings.float)

        print(f"Embedded {min(i + BATCH_SIZE, len(texts))}/{len(texts)} documents")

        # Don't sleep after the last batch
        if i + BATCH_SIZE < len(texts):
            print(f"Sleeping for {SLEEP_SECONDS} seconds...")
            time.sleep(SLEEP_SECONDS)

    return documents, embeddings