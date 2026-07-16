"use client"

import React, { useRef, useCallback, useEffect, type KeyboardEvent } from "react"
import { motion } from "framer-motion"
import { ArrowUp, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PromptInputBoxProps } from "@/types/chat"

export default function ChatPromptBox({
  onSend,
  isLoading = false,
  placeholder = "Ask anything about the Constitution of India",
  className,
}: PromptInputBoxProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [input, setInput] = React.useState("")

  const canSend = input.trim().length > 0 && !isLoading

  // Auto-resize: pin the top, grow downward, cap at 220px
  const resize = useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "0"
    el.style.height = `${Math.min(el.scrollHeight, 220)}px`
  }, [])

  useEffect(() => {
    resize()
  }, [input, resize])

  const handleSend = useCallback(() => {
    if (!canSend) return
    onSend?.(input.trim())
    setInput("")
    // Height resets via the useEffect on next render
    requestAnimationFrame(() => textareaRef.current?.focus())
  }, [canSend, input, onSend])

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "w-full max-w-[850px] mx-auto px-4 pb-4 pt-2",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex items-end gap-2",
          "rounded-[28px] border border-outline-variant/30",
          "glass",
          "shadow-lg",
          "px-4 py-3",
          "transition-colors duration-200",
          "focus-within:border-primary/30",
        )}
      >
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder={placeholder}
          rows={1}
          className={cn(
            "flex-1 resize-none bg-transparent",
            "font-body-md text-body-md text-primary placeholder:text-on-surface-variant/50",
            "outline-none",
            "max-h-[220px] overflow-y-auto",
            "scrollbar-thin scrollbar-thumb-outline-variant/30",
            "leading-6 py-0.5",
            "disabled:opacity-40 disabled:cursor-not-allowed",
          )}
        />

        {/* Send button */}
        <motion.button
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          whileHover={canSend ? { scale: 1.08 } : {}}
          whileTap={canSend ? { scale: 0.92 } : {}}
          className={cn(
            "flex-shrink-0 flex items-center justify-center",
            "h-8 w-8 rounded-full",
            "transition-all duration-200",
            canSend
              ? "bg-primary text-background hover:bg-primary/90 cursor-pointer"
              : "bg-surface-variant/50 text-on-surface-variant/50 cursor-not-allowed",
          )}
          aria-label="Send message"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}
