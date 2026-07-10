from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from retrievers.hybrid import dense_retrieval, bm25_retrieval, normalize_scores, merge_results, reranker

llm = ChatGroq(
    model_name="llama-3.3-70b-versatile",
    temperature=0
)

prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
        You are an expert legal assistant specializing in the Constitution of India.

        Answer ONLY using the provided context.

        If the answer cannot be found in the context, reply:

        "I could not find the answer in the retrieved documents."

        Always cite the Article numbers whenever possible.
        """
    ),
    (
        "human",
        """
Question:
{query}

Retrieved Context:
{context}
"""
    )
])

chain = prompt | llm | StrOutputParser()