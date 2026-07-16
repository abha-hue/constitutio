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
          "max-w-[75%] rounded-2xl px-5 py-4 font-body-md text-body-md leading-relaxed",
          isUser
            ? "bg-surface-variant text-primary rounded-br-md"
            : "glass text-on-surface-variant rounded-bl-md",
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
    </motion.div>
  )
}
