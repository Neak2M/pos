"use client"

import { useState } from "react"
import Image from "next/image"
import { Building2, Download, Filter, MoreHorizontal, Package, Plus, Search, Truck, Users } from "lucide-react"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddSupplierDialog } from "@/components/suppliers/add-supplier-dialog"
import { SupplierDetails } from "@/components/suppliers/supplier-details"
import { PurchaseOrders } from "@/components/suppliers/purchase-orders"
import { CreatePurchaseOrderDialog } from "@/components/suppliers/create-purchase-order-dialog"

// Sample supplier data
const suppliers = [
  {
    id: 1,
    name: "TechCorp Electronics",
    contactPerson: "Sarah Johnson",
    email: "sarah@techcorp.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street, Silicon Valley, CA 94025",
    website: "www.techcorp.com",
    status: "active",
    rating: 4.8,
    totalOrders: 45,
    totalSpent: 125000.0,
    lastOrderDate: "2024-01-20",
    paymentTerms: "Net 30",
    leadTime: "5-7 days",
    categories: ["Electronics", "Accessories"],
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "AudioMax Solutions",
    contactPerson: "Mike Chen",
    email: "mike@audiomax.com",
    phone: "+1 (555) 234-5678",
    address: "456 Sound Ave, Nashville, TN 37201",
    website: "www.audiomax.com",
    status: "active",
    rating: 4.5,
    totalOrders: 32,
    totalSpent: 89000.0,
    lastOrderDate: "2024-01-18",
    paymentTerms: "Net 15",
    leadTime: "3-5 days",
    categories: ["Electronics", "Audio"],
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "ProtectPro Manufacturing",
    contactPerson: "Lisa Rodriguez",
    email: "lisa@protectpro.com",
    phone: "+1 (555) 345-6789",
    address: "789 Industrial Blvd, Detroit, MI 48201",
    website: "www.protectpro.com",
    status: "active",
    rating: 4.2,
    totalOrders: 28,
    totalSpent: 45000.0,
    lastOrderDate: "2024-01-15",
    paymentTerms: "Net 45",
    leadTime: "7-10 days",
    categories: ["Accessories", "Cases"],
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "ChargeFast Technologies",
    contactPerson: "David Kim",
    email: "david@chargefast.com",
    phone: "+1 (555) 456-7890",
    address: "101 Power Street, Austin, TX 78701",
    website: "www.chargefast.com",
    status: "active",
    rating: 4.7,
    totalOrders: 38,
    totalSpent: 67000.0,
    lastOrderDate: "2024-01-22",
    paymentTerms: "Net 30",
    leadTime: "4-6 days",
    categories: ["Electronics", "Chargers"],
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Global Office Supplies",
    contactPerson: "Emma Wilson",
    email: "emma@globaloffice.com",
    phone: "+1 (555) 567-8901",
    address: "202 Business Park, Chicago, IL 60601",
    website: "www.globaloffice.com",
    status: "inactive",
    rating: 3.8,
    totalOrders: 15,
    totalSpent: 23000.0,
    lastOrderDate: "2023-11-30",
    paymentTerms: "Net 60",
    leadTime: "10-14 days",
    categories: ["Office", "Supplies"],
    logo: "/placeholder.svg?height=40&width=40",
  },
]

export default function SuppliersPage() {
  const [activeTab, setActiveTab] = useState("directory")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedSupplier, setSelectedSupplier] = useState<number | null>(null)
  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false)
  const [isCreatePOOpen, setIsCreatePOOpen] = useState(false)

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || supplier.status === statusFilter
    const matchesCategory = categoryFilter === "all" || supplier.categories.includes(categoryFilter)

    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRatingStars = (rating: number) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating))
  }

  // Get all unique categories from suppliers
  const allCategories = Array.from(new Set(suppliers.flatMap((supplier) => supplier.categories)))

  // Calculate supplier metrics
  const activeSuppliers = suppliers.filter((s) => s.status === "active").length
  const totalSpent = suppliers.reduce((sum, s) => sum + s.totalSpent, 0)
  const averageRating = suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length
  const totalOrders = suppliers.reduce((sum, s) => sum + s.totalOrders, 0)

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-muted-foreground">Manage your supplier relationships and purchase orders</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" onClick={() => setIsCreatePOOpen(true)}>
            <Package className="mr-2 h-4 w-4" />
            Create PO
          </Button>
          <Button onClick={() => setIsAddSupplierOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Supplier
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suppliers.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSuppliers}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((activeSuppliers / suppliers.length) * 100)}% of total suppliers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across {totalOrders} orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">{getRatingStars(averageRating)}</p>
          </CardContent>
        </Card>
      </div>

      {selectedSupplier ? (
        <SupplierDetails
          supplier={suppliers.find((s) => s.id === selectedSupplier)!}
          onBack={() => setSelectedSupplier(null)}
        />
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="directory">Supplier Directory</TabsTrigger>
            <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="directory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Supplier Directory</CardTitle>
                <CardDescription>View and manage your supplier database</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 py-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search suppliers..."
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
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {allCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
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
                        <TableHead className="w-[60px]">Logo</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead>Total Spent</TableHead>
                        <TableHead>Categories</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSuppliers.map((supplier) => (
                        <TableRow
                          key={supplier.id}
                          className="cursor-pointer"
                          onClick={() => setSelectedSupplier(supplier.id)}
                        >
                          <TableCell>
                            <div className="h-10 w-10 overflow-hidden rounded-md">
                              <Image
                                src={supplier.logo || "/placeholder.svg"}
                                alt={supplier.name}
                                width={40}
                                height={40}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            <div>{supplier.name}</div>
                            <div className="text-xs text-muted-foreground">{supplier.contactPerson}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">{supplier.email}</div>
                            <div className="text-xs text-muted-foreground">{supplier.phone}</div>
                          </TableCell>
                          <TableCell>{getStatusBadge(supplier.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-medium">{supplier.rating}</span>
                              <span className="text-xs text-amber-500">{getRatingStars(supplier.rating)}</span>
                            </div>
                          </TableCell>
                          <TableCell>{supplier.totalOrders}</TableCell>
                          <TableCell>${supplier.totalSpent.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {supplier.categories.slice(0, 2).map((category) => (
                                <Badge key={category} variant="outline" className="text-xs">
                                  {category}
                                </Badge>
                              ))}
                              {supplier.categories.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{supplier.categories.length - 2}
                                </Badge>
                              )}
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
                                    setSelectedSupplier(supplier.id)
                                  }}
                                >
                                  View details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                  Create purchase order
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Edit supplier</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                  View order history
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
          </TabsContent>

          <TabsContent value="orders">
            <PurchaseOrders />
          </TabsContent>
        </Tabs>
      )}

      <AddSupplierDialog open={isAddSupplierOpen} onOpenChange={setIsAddSupplierOpen} />
      <CreatePurchaseOrderDialog open={isCreatePOOpen} onOpenChange={setIsCreatePOOpen} suppliers={suppliers} />
    </div>
  )
}
