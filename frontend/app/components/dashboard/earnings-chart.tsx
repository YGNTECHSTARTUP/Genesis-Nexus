"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface EarningsChartProps {
  isClient?: boolean
}

export function EarningsChart({ isClient = false }: EarningsChartProps) {
  const freelancerData = [
    { month: "Jan", earnings: 1200, hours: 45 },
    { month: "Feb", earnings: 1800, hours: 65 },
    { month: "Mar", earnings: 1400, hours: 52 },
    { month: "Apr", earnings: 2200, hours: 78 },
    { month: "May", earnings: 1900, hours: 68 },
    { month: "Jun", earnings: 2400, hours: 85 },
  ]

  const clientData = [
    { month: "Jan", spent: 3200, projects: 2 },
    { month: "Feb", spent: 4800, projects: 3 },
    { month: "Mar", spent: 2400, projects: 2 },
    { month: "Apr", spent: 5200, projects: 4 },
    { month: "May", spent: 3900, projects: 3 },
    { month: "Jun", spent: 6400, projects: 5 },
  ]

  const data = isClient ? clientData : freelancerData
  let config: ChartConfig;
  if (isClient) {
    config = {
      spent: {
        label: "Amount Spent",
        color: "hsl(var(--chart-1))",
      },
      projects: {
        label: "Active Projects",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;
  } else {
    config = {
      earnings: {
        label: "Earnings",
        color: "hsl(var(--chart-1))",
      },
      hours: {
        label: "Hours",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;
  }

  return (
    <ChartContainer config={config} className="h-[300px]">
      <AreaChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <defs>
          <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-earnings)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-earnings)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-spent)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-spent)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={10} />
        <YAxis axisLine={false} tickLine={false} tickMargin={10} tickFormatter={(value) => `$${value}`} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey={isClient ? "spent" : "earnings"}
          stroke={isClient ? "var(--color-spent)" : "var(--color-earnings)"}
          fillOpacity={1}
          fill={isClient ? "url(#colorSpent)" : "url(#colorEarnings)"}
        />
      </AreaChart>
    </ChartContainer>
  )
}
