import type { CoreMessage } from "ai"
import { StreamingTextResponse } from "ai"

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json()

  // Get the last user message to send to your API
  const lastUserMessage = messages.filter((message) => message.role === "user").pop()

  if (!lastUserMessage) {
    return new Response("No user message found", { status: 400 })
  }

  // Call your streaming API endpoint
  const response = await fetch(
    `https://backend.eevanasivabalaji.workers.dev/ai/assistant?q=${encodeURIComponent(lastUserMessage.content as string|"")}`,
  )

  // Check if the response is valid
  if (!response.ok) {
    return new Response(`Error from API: ${response.statusText}`, { status: response.status })
  }

  // Create a TransformStream to process the response
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const transformStream = new TransformStream({
    async transform(chunk, controller) {
      const text = decoder.decode(chunk)
      // Send the decoded text to the client
      controller.enqueue(encoder.encode(text))
    },
  })

  // Pipe the response body through our transform stream
  const streamingResponse = response.body?.pipeThrough(transformStream)

  if (!streamingResponse) {
    return new Response("Failed to process streaming response", { status: 500 })
  }

  // Return a StreamingTextResponse with appropriate headers
  return new StreamingTextResponse(streamingResponse, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Encoding": "none",
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
    },
  })
}
