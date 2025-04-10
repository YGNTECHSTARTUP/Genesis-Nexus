"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  Check,
  CreditCard,
  Download,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function PaymentsOverview() {
  const [userType, setUserType] = useState<"freelancer" | "client">("freelancer")

  // Toggle between freelancer and client view for demo purposes
  const toggleUserType = () => {
    setUserType(userType === "freelancer" ? "client" : "freelancer")
  }

  // Mock transactions data
  const transactions = [
    {
      id: "1",
      type: userType === "freelancer" ? "incoming" : "outgoing",
      amount: 1250,
      date: "Oct 15, 2025",
      status: "completed",
      project: "E-commerce Website Redesign",
      counterparty: userType === "freelancer" ? "Fashion Boutique" : "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=FB",
    },
    {
      id: "2",
      type: userType === "freelancer" ? "incoming" : "outgoing",
      amount: 850,
      date: "Oct 10, 2025",
      status: "completed",
      project: "Mobile App Development",
      counterparty: userType === "freelancer" ? "Health Tech Startup" : "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40&text=HT",
    },
    {
      id: "3",
      type: userType === "freelancer" ? "incoming" : "outgoing",
      amount: 1500,
      date: "Oct 5, 2025",
      status: "completed",
      project: "CRM System Integration",
      counterparty: userType === "freelancer" ? "Marketing Agency" : "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40&text=MA",
    },
    {
      id: "4",
      type: userType === "freelancer" ? "pending" : "pending",
      amount: 750,
      date: "Oct 20, 2025",
      status: "pending",
      project: "Content Management System",
      counterparty: userType === "freelancer" ? "Educational Platform" : "James Lee",
      avatar: "/placeholder.svg?height=40&width=40&text=EP",
    },
  ]

  // Mock payment methods
  const paymentMethods = [
    {
      id: "1",
      type: "card",
      name: "Visa ending in 4242",
      icon: CreditCard,
      isDefault: true,
    },
    {
      id: "2",
      type: "bank",
      name: "Bank Account ending in 5678",
      icon: CreditCard,
      isDefault: false,
    },
  ]

  // Mock invoices
  const invoices = [
    {
      id: "INV-001",
      amount: 1250,
      date: "Oct 15, 2025",
      dueDate: "Oct 30, 2025",
      status: "paid",
      project: "E-commerce Website Redesign",
      counterparty: userType === "freelancer" ? "Fashion Boutique" : "Sarah Chen",
    },
    {
      id: "INV-002",
      amount: 850,
      date: "Oct 10, 2025",
      dueDate: "Oct 25, 2025",
      status: "paid",
      project: "Mobile App Development",
      counterparty: userType === "freelancer" ? "Health Tech Startup" : "Michael Brown",
    },
    {
      id: "INV-003",
      amount: 1500,
      date: "Oct 5, 2025",
      dueDate: "Oct 20, 2025",
      status: "paid",
      project: "CRM System Integration",
      counterparty: userType === "freelancer" ? "Marketing Agency" : "Emma Wilson",
    },
    {
      id: "INV-004",
      amount: 750,
      date: "Oct 20, 2025",
      dueDate: "Nov 5, 2025",
      status: "pending",
      project: "Content Management System",
      counterparty: userType === "freelancer" ? "Educational Platform" : "James Lee",
    },
  ]

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">
            Manage your {userType === "freelancer" ? "earnings" : "payments"} and transactions
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={toggleUserType} variant="outline">
            Switch to {userType === "freelancer" ? "Client" : "Freelancer"} View
          </Button>
          <Button>
            {userType === "freelancer" ? (
              <>
                <Plus className="mr-2 h-4 w-4" /> Create Invoice
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" /> Make Payment
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Your {userType === "freelancer" ? "earnings" : "payment"} summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {userType === "freelancer" ? "Total Earnings" : "Total Spent"}
                </p>
                <p className="text-2xl font-bold">$4,350.00</p>
                <div className="flex items-center text-sm">
                  <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500">12%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {userType === "freelancer" ? "Pending" : "Pending Payments"}
                </p>
                <p className="text-2xl font-bold">$750.00</p>
                <div className="flex items-center text-sm">
                  <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
                  <span className="text-red-500">5%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {userType === "freelancer" ? "This Month" : "This Month"}
                </p>
                <p className="text-2xl font-bold">$2,850.00</p>
                <div className="flex items-center text-sm">
                  <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500">8%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Monthly Goal</p>
                <p className="text-sm text-muted-foreground">$2,850 / $5,000</p>
              </div>
              <Progress value={57} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {userType === "freelancer"
                  ? "You've earned 57% of your monthly goal"
                  : "You've spent 57% of your monthly budget"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {userType === "freelancer" ? (
              <>
                <Button className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" /> Create New Invoice
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" /> Download Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <SlidersHorizontal className="mr-2 h-4 w-4" /> Payment Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" /> Schedule Payments
                </Button>
              </>
            ) : (
              <>
                <Button className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" /> Make a Payment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" /> Download Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <SlidersHorizontal className="mr-2 h-4 w-4" /> Payment Methods
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" /> Schedule Payments
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="flex-1">
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your recent {userType === "freelancer" ? "earnings" : "payments"}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search..." className="pl-8 w-[200px]" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={transaction.avatar} alt={transaction.counterparty} />
                        <AvatarFallback>
                          {transaction.counterparty
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{transaction.counterparty}</p>
                        <p className="text-sm text-muted-foreground">{transaction.project}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <p
                        className={`font-medium ${
                          transaction.type === "incoming"
                            ? "text-green-500"
                            : transaction.type === "outgoing"
                              ? "text-red-500"
                              : ""
                        }`}
                      >
                        {transaction.type === "incoming" ? "+" : transaction.type === "outgoing" ? "-" : ""}
                        {formatCurrency(transaction.amount)}
                      </p>
                      <Badge variant={transaction.status === "completed" ? "outline" : "secondary"} className="mt-1">
                        {transaction.status === "completed" ? <Check className="mr-1 h-3 w-3" /> : null}
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t p-4">
              <Button variant="outline">View All Transactions</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="invoices" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="flex-1">
                <CardTitle>Invoices</CardTitle>
                <CardDescription>
                  Manage your {userType === "freelancer" ? "sent" : "received"} invoices
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{invoice.id}</p>
                        <Badge variant={invoice.status === "paid" ? "outline" : "secondary"}>
                          {invoice.status === "paid" ? <Check className="mr-1 h-3 w-3" /> : null}
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm">{invoice.project}</p>
                      <p className="text-xs text-muted-foreground">
                        {invoice.counterparty} • {invoice.date}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="font-medium">{formatCurrency(invoice.amount)}</p>
                      <p className="text-xs text-muted-foreground">Due: {invoice.dueDate}</p>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t p-4">
              <Button variant="outline">View All Invoices</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="payment-methods" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <method.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {method.type.charAt(0).toUpperCase() + method.type.slice(1)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {method.isDefault && <Badge variant="outline">Default</Badge>}
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-4 w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Payment Method
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
