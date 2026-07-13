export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: number
}

export interface ChatResponse {
  query: string
  answer: string
}

export interface PromptInputBoxProps {
  onSend?: (message: string) => void
  isLoading?: boolean
  placeholder?: string
  className?: string
}
