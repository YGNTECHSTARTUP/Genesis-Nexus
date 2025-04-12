import { format, parseISO } from "date-fns"
import { CalendarRange, Clock } from "lucide-react"

interface TimelineTask {
  id: string
  task: string
  durationDays: number
  startDate: string
  endDate: string
}

interface TimelineProps {
  tasks: TimelineTask[]
}

export function Timeline({ tasks }: TimelineProps) {
  // Sort tasks by start date
  const sortedTasks = [...tasks].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

  return (
    <div className="space-y-6">
      {sortedTasks.map((task, index) => (
        <div key={task.id} className="relative pl-8">
          {/* Timeline connector */}
          {index < sortedTasks.length - 1 && <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-border" />}

          {/* Timeline dot */}
          <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full border-2 border-primary bg-background flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>

          <div className="space-y-1.5">
            <h3 className="font-medium">{task.task}</h3>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CalendarRange className="mr-1 h-3.5 w-3.5" />
                <span>
                  {format(parseISO(task.startDate), "MMM d")} - {format(parseISO(task.endDate), "MMM d, yyyy")}
                </span>
              </div>

              <div className="flex items-center">
                <Clock className="mr-1 h-3.5 w-3.5" />
                <span>
                  {task.durationDays} {task.durationDays === 1 ? "day" : "days"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
