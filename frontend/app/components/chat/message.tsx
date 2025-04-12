"use client"

import { cn } from "@/lib/utils"

type MessageProps = {
  message: {
    content: string
    role: "user" | "assistant"
    isStreaming?: boolean
  }
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2",
          isUser ? "bg-amber-500 text-white" : "bg-white/20 text-white backdrop-blur-sm",
        )}
      >
        <p className="whitespace-pre-wrap">
          {message.content}
          {message.isStreaming && <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-white/70"></span>}
        </p>
      </div>
    </div>
  )
}
