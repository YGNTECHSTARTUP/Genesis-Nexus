"use client"

import { useState, useRef, useEffect } from "react"
import { Message } from "./message"
import { ChatInput } from "./chat-input"
import { streamResponse } from "@/lib/stream-response"

type MessageType = {
  id: string
  content: string
  role: "user" | "assistant"
  isStreaming?: boolean
}

export function Chat() {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: message,
      role: "user",
    }

    // Add assistant message placeholder
    const assistantMessageId = (Date.now() + 1).toString()
    const assistantMessage: MessageType = {
      id: assistantMessageId,
      content: "",
      role: "assistant",
      isStreaming: true,
    }

    setMessages((prev) => [...prev, userMessage, assistantMessage])
    setIsLoading(true)

    try {
      // Stream the response
      const controller = new AbortController()
      const signal = controller.signal

      await streamResponse(`https://backend.eevanasivabalaji.workers.dev/ai/assistant?q=${encodeURIComponent(message)}`, signal, (chunk) => {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content: msg.content + chunk } : msg)),
        )
      })

      // Mark streaming as complete
      setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, isStreaming: false } : msg)))
    } catch (error) {
      console.error("Error streaming response:", error)
      // Update the assistant message to show the error
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? { ...msg, content: "Sorry, there was an error processing your request.", isStreaming: false }
            : msg,
        ),
      )
    } finally {
      setIsLoading(false)
    }
  }

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
          messages.map((message) => <Message key={message.id} message={message} />)
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-white/10">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  )
}
