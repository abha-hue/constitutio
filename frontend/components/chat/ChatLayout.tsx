"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { Message } from "@/types/chat"
import ChatMessages from "./ChatMessages"
import ChatPromptBox from "@/components/ui/chat-prompt-box"
import { Scale } from "lucide-react"

interface Props {
  messages: Message[]
  isLoading: boolean
  onSend: (message: string) => void
}

export default function ChatLayout({ messages, isLoading, onSend }: Props) {
  const hasMessages = messages.length > 0

  return (
    <div className="flex h-dvh flex-col bg-[#0a0a0b]">
      {/* Header — always visible */}
      <header className="flex items-center justify-center gap-2.5 border-b border-white/[0.06] px-6 py-4">
        <Scale className="h-5 w-5 text-white/50" />
        <h1 className="text-base font-semibold tracking-tight text-white/80">
          Constitutio
        </h1>
      </header>

      {hasMessages ? (
        <>
          {/* Messages (scrollable) */}
          <ChatMessages messages={messages} isLoading={isLoading} />

          {/* Prompt (bottom) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-shrink-0 border-t border-white/[0.04] bg-[#0a0a0b]/80 backdrop-blur-md"
          >
            <ChatPromptBox onSend={onSend} isLoading={isLoading} />
          </motion.div>
        </>
      ) : (
        /* Empty state — prompt centered */
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-6 text-center"
          >
            <h2 className="text-2xl font-semibold text-white/70">
              What do you want to know?
            </h2>
            <p className="mt-2 text-sm text-white/30">
              Ask anything about the Constitution of India
            </p>
          </motion.div>

          <ChatPromptBox onSend={onSend} isLoading={isLoading} />
        </div>
      )}
    </div>
  )
}
