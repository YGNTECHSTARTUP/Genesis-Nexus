"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SendIcon } from "lucide-react"

type ChatInputProps = {
  onSendMessage: (message: string) => void
  isLoading: boolean
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSendMessage(input)
      setInput("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        disabled={isLoading}
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-amber-500"
      />
      <Button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="bg-amber-500 hover:bg-amber-600 text-white"
      >
        <SendIcon className="h-4 w-4" />
      </Button>
    </form>
  )
}
