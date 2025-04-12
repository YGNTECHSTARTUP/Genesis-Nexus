export async function streamResponse(url: string, signal: AbortSignal, onChunk: (chunk: string) => void) {
  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  if (!response.body) {
    throw new Error("ReadableStream not supported")
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  let done = false

  while (!done) {
    const { value, done: doneReading } = await reader.read()
    done = doneReading

    if (value) {
      const chunk = decoder.decode(value, { stream: true })
      onChunk(chunk)
    }
  }
}
