"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Download, Filter, MoreHorizontal, Search, Star, Trash, UserPlus, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { AddCustomerDialog } from "@/components/customers/add-customer-dialog"
import { CustomerDetails } from "@/components/customers/customer-details"

// Sample customer data
const customers = [
  {
    id: 1,
    name: "Jackson Miller",
    email: "jackson.miller@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    joinDate: "2023-01-15",
    totalSpent: 3245.75,
    totalOrders: 12,
    lastPurchase: "2024-01-20",
    status: "active",
    loyaltyPoints: 320,
    avatar: "/placeholder.svg?height=40&width=40",
    tags: ["VIP", "Online"],
  },
  {
    id: 2,
    name: "Sophia Davis",
    email: "sophia.davis@example.com",
    phone: "+1 (555) 234-5678",
    address: "456 Oak Ave, San Francisco, CA 94102",
    joinDate: "2023-02-20",
    totalSpent: 1875.5,
    totalOrders: 8,
    lastPurchase: "2024-01-15",
    status: "active",
    loyaltyPoints: 180,
    avatar: "/placeholder.svg?height=40&width=40",
    tags: ["New"],
  },
  {
    id: 3,
    name: "William Kim",
    email: "william.kim@example.com",
    phone: "+1 (555) 345-6789",
    address: "789 Pine St, Chicago, IL 60601",
    joinDate: "2023-03-10",
    totalSpent: 4520.25,
    totalOrders: 15,
    lastPurchase: "2024-01-18",
    status: "active",
    loyaltyPoints: 450,
    avatar: "/placeholder.svg?height=40&width=40",
    tags: ["VIP", "Wholesale"],
  },
  {
    id: 4,
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    phone: "+1 (555) 456-7890",
    address: "101 Maple Dr, Austin, TX 78701",
    joinDate: "2023-04-05",
    totalSpent: 950.0,
    totalOrders: 5,
    lastPurchase: "2023-12-30",
    status: "inactive",
    loyaltyPoints: 95,
    avatar: "/placeholder.svg?height=40&width=40",
    tags: ["Online"],
  },
  {
    id: 5,
    name: "Noah Thompson",
    email: "noah.thompson@example.com",
    phone: "+1 (555) 567-8901",
    address: "202 Cedar Ln, Seattle, WA 98101",
    joinDate: "2023-05-12",
    totalSpent: 6780.5,
    totalOrders: 20,
    lastPurchase: "2024-01-22",
    status: "active",
    loyaltyPoints: 680,
    avatar: "/placeholder.svg?height=40&width=40",
    tags: ["VIP", "Corporate"],
  },
  {
    id: 6,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "+1 (555) 678-9012",
    address: "303 Birch Rd, Boston, MA 02108",
    joinDate: "2023-06-18",
    totalSpent: 2340.25,
    totalOrders: 9,
    lastPurchase: "2024-01-10",
    status: "active",
    loyaltyPoints: 230,
    avatar: "/placeholder.svg?height=40&width=40",
    tags: ["Online"],
  },
  {
    id: 7,
    name: "Liam Johnson",
    email: "liam.johnson@example.com",
    phone: "+1 (555) 789-0123",
    address: "404 Spruce Ave, Denver, CO 80202",
    joinDate: "2023-07-22",
    totalSpent: 1120.75,
    totalOrders: 6,
    lastPurchase: "2023-12-15",
    status: "inactive",
    loyaltyPoints: 110,
    avatar: "/placeholder.svg?height=40&width=40",
    tags: ["New"],
  },
  {
    id: 8,
    name: "Ava Brown",
    email: "ava.brown@example.com",
    phone: "+1 (555) 890-1234",
    address: "505 Elm St, Miami, FL 33101",
    joinDate: "2023-08-30",
    totalSpent: 3675.0,
    totalOrders: 14,
    lastPurchase: "2024-01-05",
    status: "active",
    loyaltyPoints: 370,
    avatar: "/placeholder.svg?height=40&width=40",
    tags: ["VIP"],
  },
]

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [tagFilter, setTagFilter] = useState("all")
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null)
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false)

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    const matchesTag = tagFilter === "all" || customer.tags.includes(tagFilter)

    return matchesSearch && matchesStatus && matchesTag
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Get all unique tags from customers
  const allTags = Array.from(new Set(customers.flatMap((customer) => customer.tags)))

  // Calculate customer metrics
  const activeCustomers = customers.filter((c) => c.status === "active").length
  const totalSpent = customers.reduce((sum, c) => sum + c.totalSpent, 0)
  const averageSpent = totalSpent / customers.length
  const vipCustomers = customers.filter((c) => c.tags.includes("VIP")).length

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your customer relationships and view purchase history</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setIsAddCustomerOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCustomers}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((activeCustomers / customers.length) * 100)}% of total customers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Spent</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageSpent.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per customer lifetime</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VIP Customers</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vipCustomers}</div>
            <p className="text-xs text-muted-foreground">High-value customers</p>
          </CardContent>
        </Card>
      </div>

      {selectedCustomer ? (
        <CustomerDetails
          customer={customers.find((c) => c.id === selectedCustomer)!}
          onBack={() => setSelectedCustomer(null)}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Customer Directory</CardTitle>
            <CardDescription>View and manage your customer database</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 py-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={tagFilter} onValueChange={setTagFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {allTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px]">Avatar</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Last Purchase</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow
                      key={customer.id}
                      className="cursor-pointer"
                      onClick={() => setSelectedCustomer(customer.id)}
                    >
                      <TableCell>
                        <div className="h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src={customer.avatar || "/placeholder.svg"}
                            alt={customer.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div>{customer.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Since {new Date(customer.joinDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{customer.email}</div>
                        <div className="text-xs text-muted-foreground">{customer.phone}</div>
                      </TableCell>
                      <TableCell>{getStatusBadge(customer.status)}</TableCell>
                      <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                      <TableCell>{customer.totalOrders}</TableCell>
                      <TableCell>{new Date(customer.lastPurchase).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {customer.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedCustomer(customer.id)
                              }}
                            >
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Edit customer</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      <AddCustomerDialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen} />
    </div>
  )
}
