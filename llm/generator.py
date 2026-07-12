from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

from retrievers.hybrid import hybrid_retrieval

# Initialize LLM once
llm = ChatGroq(
    model_name="llama-3.3-70b-versatile",
    temperature=0,
)

# Prompt Template
chat_prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
You are an AI legal assistant specializing in the Constitution of India.

Answer the user's question ONLY using the provided context.

If the answer cannot be found in the context, say:
"I could not find the answer in the retrieved documents."

Be concise and cite the relevant Article numbers whenever possible.

Context:
{context}
"""
        ),
        (
            "human",
            "{query}"
        ),
    ]
)

# Build chain once
chain = chat_prompt | llm | StrOutputParser()


def build_context(retrieved_docs):
    """
    Converts retrieved documents into a readable context string.
    """

    context = ""

    for doc in retrieved_docs[:5]:
        context += f"""
Title: {doc['title']}
Article: {doc['article']}

{doc['text']}

----------------------------------------
"""

    return context


def generate_response(query):
    retrieved_docs = hybrid_retrieval(query)

    context = build_context(retrieved_docs)

    # Generate response
    response = chain.invoke(
        {
            "query": query,
            "context": context
        }
    )

    return response


if __name__ == "__main__":

    query = "What is the significance of Article 370 in the Indian Constitution?"

    answer = generate_response(query)

    print("\nQuestion:")
    print(query)

    print("\nAnswer:")
    print(answer)