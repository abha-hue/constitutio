"use client"

import { useState, useCallback } from "react"
import type { Message } from "@/types/chat"
import { sendMessage } from "@/lib/api"

let _id = 0
const nextId = () => `msg-${Date.now()}-${++_id}`

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMsg: Message = {
      id: nextId(),
      role: "user",
      content: trimmed,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMsg])
    setIsLoading(true)

    try {
      const answer = await sendMessage(trimmed)

      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: "assistant",
          content: answer,
          timestamp: Date.now(),
        },
      ])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: "assistant",
          content: `Something went wrong: ${err instanceof Error ? err.message : "Unknown error"}`,
          timestamp: Date.now(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { messages, isLoading, send }
}
