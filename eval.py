from pinecone import Pinecone
import os
from dotenv import load_dotenv

load_dotenv()
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

# Initialize your index
index = pc.Index("constituto")

# Delete all records from a specific namespace
# Note: For the default namespace, omit the namespace parameter or use namespace="__default__"
index.delete(delete_all=True)