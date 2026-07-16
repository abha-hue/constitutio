"use client"

import ChatLayout from "@/components/chat/ChatLayout"
import { useChat } from "@/hooks/useChat"

export default function Home() {
  const { messages, isLoading, send } = useChat()

  return <ChatLayout messages={messages} isLoading={isLoading} onSend={send} />
}
