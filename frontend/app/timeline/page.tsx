import { TimelineGenerator } from "./components/timeline-generator"

export default function Home() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Project Timeline Generator</h1>
      <TimelineGenerator />
    </div>
  )
}