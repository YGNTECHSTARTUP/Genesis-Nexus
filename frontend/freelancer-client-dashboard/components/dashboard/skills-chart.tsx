"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

export function SkillsChart() {
  const data = [
    { skill: "React", level: 90 },
    { skill: "Node.js", level: 85 },
    { skill: "TypeScript", level: 80 },
    { skill: "UI/UX", level: 75 },
    { skill: "GraphQL", level: 65 },
  ]

  return (
    <ChartContainer
      config={{
        level: {
          label: "Skill Level",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[200px]"
    >
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 70 }}>
        <XAxis type="number" domain={[0, 100]} hide />
        <YAxis dataKey="skill" type="category" axisLine={false} tickLine={false} width={60} tick={{ fontSize: 12 }} />
        <Bar
          dataKey="level"
          fill="var(--color-level)"
          radius={4}
          barSize={12}
          label={{
            position: "right",
            formatter: (value: number) => `${value}%`,
            fontSize: 12,
          }}
        />
      </BarChart>
    </ChartContainer>
  )
}
