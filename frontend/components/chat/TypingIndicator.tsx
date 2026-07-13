"use client"

import { motion } from "framer-motion"

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.25 }}
      className="flex justify-start"
    >
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-white/[0.05] border border-white/[0.06] px-4 py-3">
        <span className="typing-dot" />
        <span className="typing-dot [animation-delay:0.15s]" />
        <span className="typing-dot [animation-delay:0.3s]" />
      </div>
    </motion.div>
  )
}
