"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ArrowDown, ArrowUp, BarChart3, DollarSign, LineChartIcon, PieChartIcon, Users } from "lucide-react"

export default function AnalyticsOverview() {
  const [userType, setUserType] = useState<"freelancer" | "client">("freelancer")
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month")

  // Toggle between freelancer and client view for demo purposes
  const toggleUserType = () => {
    setUserType(userType === "freelancer" ? "client" : "freelancer")
  }

  // Mock data for freelancer
  const freelancerData = {
    earnings: [
      { month: "Jan", amount: 3200 },
      { month: "Feb", amount: 4500 },
      { month: "Mar", amount: 3800 },
      { month: "Apr", amount: 5200 },
      { month: "May", amount: 4800 },
      { month: "Jun", amount: 6100 },
      { month: "Jul", amount: 5500 },
      { month: "Aug", amount: 7200 },
      { month: "Sep", amount: 6800 },
      { month: "Oct", amount: 8500 },
      { month: "Nov", amount: 7800 },
      { month: "Dec", amount: 9200 },
    ],
    hours: [
      { month: "Jan", hours: 120 },
      { month: "Feb", hours: 160 },
      { month: "Mar", hours: 140 },
      { month: "Apr", hours: 180 },
      { month: "May", hours: 170 },
      { month: "Jun", hours: 190 },
      { month: "Jul", hours: 175 },
      { month: "Aug", hours: 200 },
      { month: "Sep", hours: 185 },
      { month: "Oct", hours: 210 },
      { month: "Nov", hours: 195 },
      { month: "Dec", hours: 220 },
    ],
    projectTypes: [
      { name: "Web Development", value: 45 },
      { name: "UI/UX Design", value: 25 },
      { name: "Mobile App", value: 20 },
      { name: "Other", value: 10 },
    ],
    clientDistribution: [
      { name: "Technology", value: 40 },
      { name: "E-commerce", value: 25 },
      { name: "Healthcare", value: 20 },
      { name: "Education", value: 15 },
    ],
    skills: [
      { name: "React", value: 90 },
      { name: "Node.js", value: 85 },
      { name: "TypeScript", value: 80 },
      { name: "UI/UX", value: 75 },
      { name: "GraphQL", value: 65 },
    ],
  }

  // Mock data for client
  const clientData = {
    spending: [
      { month: "Jan", amount: 5200 },
      { month: "Feb", amount: 7500 },
      { month: "Mar", amount: 6800 },
      { month: "Apr", amount: 8200 },
      { month: "May", amount: 7800 },
      { month: "Jun", amount: 9100 },
      { month: "Jul", amount: 8500 },
      { month: "Aug", amount: 10200 },
      { month: "Sep", amount: 9800 },
      { month: "Oct", amount: 11500 },
      { month: "Nov", amount: 10800 },
      { month: "Dec", amount: 12200 },
    ],
    projects: [
      { month: "Jan", count: 2 },
      { month: "Feb", count: 3 },
      { month: "Mar", count: 2 },
      { month: "Apr", count: 4 },
      { month: "May", count: 3 },
      { month: "Jun", count: 5 },
      { month: "Jul", count: 4 },
      { month: "Aug", count: 6 },
      { month: "Sep", count: 5 },
      { month: "Oct", count: 7 },
      { month: "Nov", count: 6 },
      { month: "Dec", count: 8 },
    ],
    projectTypes: [
      { name: "Web Development", value: 50 },
      { name: "UI/UX Design", value: 20 },
      { name: "Mobile App", value: 25 },
      { name: "Other", value: 5 },
    ],
    freelancerDistribution: [
      { name: "Full-time", value: 60 },
      { name: "Part-time", value: 30 },
      { name: "Custom", value: 10 },
    ],
    budgetAllocation: [
      { name: "Development", value: 45 },
      { name: "Design", value: 25 },
      { name: "Management", value: 20 },
      { name: "Other", value: 10 },
    ],
  }

  // Get data based on time range
  const getTimeRangeData = (data: any[], range: "week" | "month" | "year") => {
    if (range === "week") return data.slice(-7)
    if (range === "month") return data.slice(-30)
    return data
  }

  // Calculate percentage change
  const calculateChange = (data: any[], key: string) => {
    if (data.length < 2) return 0
    const current = data[data.length - 1][key]
    const previous = data[data.length - 2][key]
    return ((current - previous) / previous) * 100
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track your {userType === "freelancer" ? "freelancing" : "project"} performance
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={toggleUserType} variant="outline">
            Switch to {userType === "freelancer" ? "Client" : "Freelancer"} View
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {userType === "freelancer" ? (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(freelancerData.earnings[freelancerData.earnings.length - 1].amount)}
                </div>
                <div className="flex items-center pt-1">
                  {calculateChange(freelancerData.earnings, "amount") > 0 ? (
                    <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  <p
                    className={`text-xs ${
                      calculateChange(freelancerData.earnings, "amount") > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {Math.abs(calculateChange(freelancerData.earnings, "amount")).toFixed(1)}%
                  </p>
                  <p className="text-xs text-muted-foreground ml-1">from last month</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hours Worked</CardTitle>
                <LineChartIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{freelancerData.hours[freelancerData.hours.length - 1].hours}</div>
                <div className="flex items-center pt-1">
                  {calculateChange(freelancerData.hours, "hours") > 0 ? (
                    <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  <p
                    className={`text-xs ${
                      calculateChange(freelancerData.hours, "hours") > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {Math.abs(calculateChange(freelancerData.hours, "hours")).toFixed(1)}%
                  </p>
                  <p className="text-xs text-muted-foreground ml-1">from last month</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hourly Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$65.00</div>
                <div className="flex items-center pt-1">
                  <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                  <p className="text-xs text-green-500">5.0%</p>
                  <p className="text-xs text-muted-foreground ml-1">from last year</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <PieChartIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <div className="flex items-center pt-1">
                  <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                  <p className="text-xs text-green-500">1</p>
                  <p className="text-xs text-muted-foreground ml-1">from last month</p>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spending</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(clientData.spending[clientData.spending.length - 1].amount)}
                </div>
                <div className="flex items-center pt-1">
                  {calculateChange(clientData.spending, "amount") > 0 ? (
                    <ArrowUp className="mr-1 h-3 w-3 text-red-500" />
                  ) : (
                    <ArrowDown className="mr-1 h-3 w-3 text-green-500" />
                  )}
                  <p
                    className={`text-xs ${
                      calculateChange(clientData.spending, "amount") > 0 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {Math.abs(calculateChange(clientData.spending, "amount")).toFixed(1)}%
                  </p>
                  <p className="text-xs text-muted-foreground ml-1">from last month</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{clientData.projects[clientData.projects.length - 1].count}</div>
                <div className="flex items-center pt-1">
                  {calculateChange(clientData.projects, "count") > 0 ? (
                    <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  <p
                    className={`text-xs ${
                      calculateChange(clientData.projects, "count") > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {Math.abs(calculateChange(clientData.projects, "count")).toFixed(1)}%
                  </p>
                  <p className="text-xs text-muted-foreground ml-1">from last month</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Project Cost</CardTitle>
                <LineChartIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$8,500</div>
                <div className="flex items-center pt-1">
                  <ArrowUp className="mr-1 h-3 w-3 text-red-500" />
                  <p className="text-xs text-red-500">3.2%</p>
                  <p className="text-xs text-muted-foreground ml-1">from last year</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Freelancers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <div className="flex items-center pt-1">
                  <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                  <p className="text-xs text-green-500">2</p>
                  <p className="text-xs text-muted-foreground ml-1">from last month</p>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          {userType === "freelancer" && <TabsTrigger value="skills">Skills</TabsTrigger>}
          {userType === "client" && <TabsTrigger value="budget">Budget</TabsTrigger>}
        </TabsList>
        <TabsContent value="overview" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{userType === "freelancer" ? "Earnings Overview" : "Spending Overview"}</CardTitle>
              <CardDescription>
                {userType === "freelancer"
                  ? "Your earnings over the selected time period"
                  : "Your spending over the selected time period"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  amount: {
                    label: userType === "freelancer" ? "Earnings" : "Spending",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <AreaChart
                  data={
                    userType === "freelancer"
                      ? getTimeRangeData(freelancerData.earnings, timeRange)
                      : getTimeRangeData(clientData.spending, timeRange)
                  }
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-amount)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-amount)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={10} />
                  <YAxis axisLine={false} tickLine={false} tickMargin={10} tickFormatter={(value) => `$${value}`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="var(--color-amount)"
                    fillOpacity={1}
                    fill="url(#colorAmount)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="details" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{userType === "freelancer" ? "Hours Worked" : "Project Count"}</CardTitle>
              <CardDescription>
                {userType === "freelancer"
                  ? "Your working hours over the selected time period"
                  : "Your project count over the selected time period"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: userType === "freelancer" ? "Hours" : "Projects",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <LineChart
                  data={
                    userType === "freelancer"
                      ? getTimeRangeData(freelancerData.hours, timeRange).map((item) => ({
                          month: item.month,
                          value: item.hours,
                        }))
                      : getTimeRangeData(clientData.projects, timeRange).map((item) => ({
                          month: item.month,
                          value: item.count,
                        }))
                  }
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={10} />
                  <YAxis axisLine={false} tickLine={false} tickMargin={10} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--color-value)"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "var(--color-value)" }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="distribution" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{userType === "freelancer" ? "Project Types" : "Project Distribution"}</CardTitle>
                <CardDescription>
                  {userType === "freelancer"
                    ? "Distribution of your projects by type"
                    : "Distribution of your projects by type"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <PieChart width={300} height={300}>
                    <Pie
                      data={userType === "freelancer" ? freelancerData.projectTypes : clientData.projectTypes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {(userType === "freelancer" ? freelancerData.projectTypes : clientData.projectTypes).map(
                        (entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ),
                      )}
                    </Pie>
                  </PieChart>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{userType === "freelancer" ? "Client Industries" : "Freelancer Types"}</CardTitle>
                <CardDescription>
                  {userType === "freelancer"
                    ? "Distribution of your clients by industry"
                    : "Distribution of your freelancers by availability"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <PieChart width={300} height={300}>
                    <Pie
                      data={
                        userType === "freelancer"
                          ? freelancerData.clientDistribution
                          : clientData.freelancerDistribution
                      }
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {(userType === "freelancer"
                        ? freelancerData.clientDistribution
                        : clientData.freelancerDistribution
                      ).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        {userType === "freelancer" && (
          <TabsContent value="skills" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Skills Analysis</CardTitle>
                <CardDescription>Your skill levels and utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Skill Level",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <BarChart
                    data={freelancerData.skills}
                    layout="vertical"
                    margin={{ top: 20, right: 20, bottom: 20, left: 80 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={70} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="value"
                      fill="var(--color-value)"
                      radius={4}
                      barSize={20}
                      label={{ position: "right", formatter: (value: number) => `${value}%` }}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        )}
        {userType === "client" && (
          <TabsContent value="budget" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Budget Allocation</CardTitle>
                <CardDescription>How your budget is distributed across different areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <PieChart width={300} height={300}>
                    <Pie
                      data={clientData.budgetAllocation}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {clientData.budgetAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
