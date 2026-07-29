import os
from dotenv import load_dotenv
from pinecone import Pinecone

from chunker import create_embeddings

load_dotenv()

PINECONE_INDEX = "constituto"


def get_index():
    pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
    return pc.Index(PINECONE_INDEX)


def build_vectors(documents, embeddings):
    vectors = []

    for document, embedding in zip(documents, embeddings):
        vectors.append(
            {
                "id": document["id"],
                "values": embedding,
                "metadata": document["metadata"],
            }
        )

    return vectors


def main():
    documents, embeddings = create_embeddings()

    assert len(documents) == len(embeddings), (
        f"Mismatch: {len(documents)} documents but "
        f"{len(embeddings)} embeddings."
    )

    vectors = build_vectors(documents, embeddings)

    index = get_index()

    index.upsert(vectors=vectors)

    print(f"Successfully uploaded {len(vectors)} vectors.")


if __name__ == "__main__":
    main()