"use client"

import { useState } from "react"
import { Calendar, CreditCard, Download, Filter, MoreHorizontal, Receipt, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample purchase history data
const purchaseHistoryData = [
  {
    id: "ORD-001-2024",
    customerId: 1,
    date: "2024-01-20",
    total: 499.99,
    items: 3,
    paymentMethod: "credit_card",
    status: "completed",
  },
  {
    id: "ORD-002-2024",
    customerId: 1,
    date: "2023-12-15",
    total: 129.99,
    items: 1,
    paymentMethod: "cash",
    status: "completed",
  },
  {
    id: "ORD-003-2024",
    customerId: 1,
    date: "2023-11-30",
    total: 349.5,
    items: 2,
    paymentMethod: "credit_card",
    status: "completed",
  },
  {
    id: "ORD-004-2024",
    customerId: 1,
    date: "2023-10-22",
    total: 89.99,
    items: 1,
    paymentMethod: "mobile",
    status: "completed",
  },
  {
    id: "ORD-005-2024",
    customerId: 1,
    date: "2023-09-15",
    total: 1299.99,
    items: 4,
    paymentMethod: "credit_card",
    status: "completed",
  },
  {
    id: "ORD-006-2024",
    customerId: 1,
    date: "2023-08-05",
    total: 59.99,
    items: 1,
    paymentMethod: "cash",
    status: "completed",
  },
  {
    id: "ORD-007-2024",
    customerId: 1,
    date: "2023-07-20",
    total: 199.99,
    items: 2,
    paymentMethod: "credit_card",
    status: "completed",
  },
  {
    id: "ORD-008-2024",
    customerId: 1,
    date: "2023-06-10",
    total: 149.99,
    items: 1,
    paymentMethod: "mobile",
    status: "completed",
  },
  {
    id: "ORD-009-2024",
    customerId: 1,
    date: "2023-05-28",
    total: 299.99,
    items: 3,
    paymentMethod: "credit_card",
    status: "completed",
  },
  {
    id: "ORD-010-2024",
    customerId: 1,
    date: "2023-04-15",
    total: 79.99,
    items: 1,
    paymentMethod: "cash",
    status: "completed",
  },
  {
    id: "ORD-011-2024",
    customerId: 2,
    date: "2024-01-15",
    total: 199.99,
    items: 2,
    paymentMethod: "credit_card",
    status: "completed",
  },
  {
    id: "ORD-012-2024",
    customerId: 3,
    date: "2024-01-18",
    total: 299.99,
    items: 1,
    paymentMethod: "credit_card",
    status: "completed",
  },
]

interface PurchaseHistoryProps {
  customerId: number
  limit?: number
}

export function PurchaseHistory({ customerId, limit }: PurchaseHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default">Completed</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "refunded":
        return <Badge variant="destructive">Refunded</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "credit_card":
        return <CreditCard className="h-4 w-4 text-muted-foreground" />
      case "cash":
        return <Calendar className="h-4 w-4 text-muted-foreground" />
      case "mobile":
        return <Calendar className="h-4 w-4 text-muted-foreground" />
      default:
        return <Calendar className="h-4 w-4 text-muted-foreground" />
    }
  }

  // Filter purchases by customer ID and other filters
  const filteredPurchases = purchaseHistoryData
    .filter((purchase) => purchase.customerId === customerId)
    .filter((purchase) => {
      const matchesSearch = purchase.id.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || purchase.status === statusFilter
      const matchesPayment = paymentFilter === "all" || purchase.paymentMethod === paymentFilter

      return matchesSearch && matchesStatus && matchesPayment
    })
    .slice(0, limit || purchaseHistoryData.length)

  return (
    <div className="space-y-4">
      {!limit && (
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="credit_card">Credit Card</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPurchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell className="font-medium">{purchase.id}</TableCell>
                <TableCell>{new Date(purchase.date).toLocaleDateString()}</TableCell>
                <TableCell>{purchase.items}</TableCell>
                <TableCell>${purchase.total.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getPaymentMethodIcon(purchase.paymentMethod)}
                    <span className="capitalize">{purchase.paymentMethod.replace("_", " ")}</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(purchase.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Receipt className="mr-2 h-4 w-4" />
                        View receipt
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download invoice
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View order details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
