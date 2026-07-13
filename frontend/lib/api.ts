import type { ChatResponse } from "@/types/chat"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

/**
 * Send a message to the Constitutio RAG backend.
 * This is the ONLY file that touches the backend — swap this to change providers.
 */
export async function sendMessage(message: string): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: message }),
  })

  if (!res.ok) {
    throw new Error(`Backend error: ${res.status}`)
  }

  const data: ChatResponse = await res.json()

  if ("error" in data) {
    throw new Error((data as unknown as { error: string }).error)
  }

  return data.answer
}
