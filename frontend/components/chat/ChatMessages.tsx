"use client"

import { useRef, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import type { Message } from "@/types/chat"
import MessageBubble from "./MessageBubble"
import TypingIndicator from "./TypingIndicator"

interface Props {
  messages: Message[]
  isLoading: boolean
}

export default function ChatMessages({ messages, isLoading }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-white/10">
      <div className="mx-auto flex max-w-[850px] flex-col gap-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <AnimatePresence>{isLoading && <TypingIndicator />}</AnimatePresence>
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
