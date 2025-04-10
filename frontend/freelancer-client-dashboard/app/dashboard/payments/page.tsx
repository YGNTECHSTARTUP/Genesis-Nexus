import type { Metadata } from "next"
import PaymentsOverview from "@/components/dashboard/payments-overview"

export const metadata: Metadata = {
  title: "Payments",
  description: "Manage your payments and transactions",
}

export default function PaymentsPage() {
  return <PaymentsOverview />
}
