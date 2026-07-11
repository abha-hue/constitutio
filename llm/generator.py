from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from retrievers.hybrid import dense_retrieval, bm25_retrieval, normalize_scores, merge_results, reranker

llm = ChatGroq(
    model_name="llama-3.3-70b-versatile",
    temperature=0,
    
)

def generate_response(query):
    # Step 1: Retrieve relevant documents using hybrid retrieval
    dense_results = dense_retrieval(query)
    bm25_results = bm25_retrieval(query)

    # Step 2: Normalize scores for both retrieval methods
    normalize_scores(dense_results)
    normalize_scores(bm25_results)

    # Step 3: Merge results from both retrieval methods
    merged_results = merge_results(dense_results, bm25_results, alpha=0.5)

    # Step 4: Rerank the merged results based on relevance to the query
    reranked_results = reranker(merged_results, query)

    # Step 5: Prepare the context for the LLM
    context = "\n\n".join([f"Title: {result['title']}\nArticle: {result['article']}\nText: {result['text']}" for result in reranked_results[:10]])

    # Step 6: Create a prompt for the LLM
    prompt_template = ChatPromptTemplate.from_template(
        "You are an AI assistant. Use the following context to answer the question.\n\nContext:\n{context}\n\nQuestion:\n{query}\n\nAnswer:"
    )
    
    prompt = prompt_template.format(context=context, query=query)

    # Step 7: Generate a response using the LLM
    response = llm.generate(prompt)
    
    return response

print(generate_response("What is the significance of Article 370 in the Indian Constitution?"))