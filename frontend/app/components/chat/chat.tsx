"use client"

import { useChat } from "ai/react"
import { Message } from "./message"
import { SendIcon } from "lucide-react"
import { useRef, useEffect } from "react"

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    onError: (error) => {
      console.error("Chat error:", error)
    },
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="w-full max-w-3xl h-[85vh] flex flex-col rounded-2xl overflow-hidden backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl">
      <div className="p-4 border-b border-white/10">
        <h1 className="text-xl font-semibold text-white">AI Assistant</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-white/70 text-center">Send a message to start the conversation</p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <Message
                key={message.id}
                message={{
                  content: message.content,
                  role: message.role as "user"|"assistant",
                  isStreaming:
                    message.role === "assistant" && isLoading && message.id === messages[messages.length - 1].id,
                }}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="p-4 border-t border-white/10">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus-visible:ring-amber-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-amber-500 hover:bg-amber-600 text-white rounded-md px-4 py-2 disabled:opacity-50"
          >
            <SendIcon className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
