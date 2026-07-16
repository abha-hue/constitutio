"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { Message } from "@/types/chat"
import ChatMessages from "./ChatMessages"
import ChatPromptBox from "@/components/ui/chat-prompt-box"
import { Scale } from "lucide-react"
import AnimatedScale from "@/components/ui/animated-scale"

interface Props {
  messages: Message[]
  isLoading: boolean
  onSend: (message: string) => void
}

export default function ChatLayout({ messages, isLoading, onSend }: Props) {
  const hasMessages = messages.length > 0

  return (
    <div className="flex h-dvh flex-col bg-background custom-scrollbar">
      {/* Header — always visible */}
      <header className="flex items-center justify-center gap-2.5 border-b border-outline-variant/30 px-6 py-4">
        <Scale className="h-5 w-5 text-primary/50" />
        <h1 className="font-headline-sm text-[20px] font-semibold tracking-tight text-primary">
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
            className="flex-shrink-0 border-t border-outline-variant/30 bg-background/80 backdrop-blur-md"
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
            <div className="flex justify-center mb-6">
              <AnimatedScale className="w-24 h-24" />
            </div>
            <h2 className="font-headline-md text-headline-md text-primary">
              What do you want to know?
            </h2>
            <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
              Ask anything about the Constitution of India
            </p>
          </motion.div>

          <ChatPromptBox onSend={onSend} isLoading={isLoading} />
        </div>
      )}
    </div>
  )
}
