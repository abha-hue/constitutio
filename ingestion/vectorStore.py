import os
from dotenv import load_dotenv
from pinecone import Pinecone

import chunker
load_dotenv()


pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index = pc.Index("constituto")

def main():
    embeddings = chunker.create_embeddings()

    vectors = []
    load_dotenv()
    for i, doc in enumerate(chunker.document):
        vectors.append(
            {
                "id": f"article_{doc['metadata']['article']}",
                "values": embeddings[i].tolist(),
                "metadata": {**doc["metadata"]},
            }
        )

    index.upsert(vectors=vectors)


if __name__ == "__main__":
    main()

