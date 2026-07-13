"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { Message } from "@/types/chat"

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-white/[0.12] text-white/90 rounded-br-md"
            : "bg-white/[0.05] border border-white/[0.06] text-white/80 rounded-bl-md",
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
    </motion.div>
  )
}
