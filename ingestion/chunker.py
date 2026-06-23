import pandas as pd
from sentence_transformers import SentenceTransformer

df = pd.read_csv("Constitution of India.csv")

document = []

for index, row in df.iterrows():
    document.append({
        "text" : row["description"],
        "metadata" : {
            "source" : "Constitution of India",
            "title" : row["title"],
            "article" : row["article"]
        }
    })
    
model = SentenceTransformer('all-MiniLM-L6-v2')

texts = [doc["text"] for doc in document]

embeddings = model.encode(
    texts,
    convert_to_numpy=True,
    show_progress_bar=True
)

print(len(document))
print(embeddings.shape)
pd.DataFrame(embeddings).to_csv("embeddings.csv", index=False)







