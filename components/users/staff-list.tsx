"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StaffDetails } from "./staff-details"
import { AddStaffDialog } from "./add-staff-dialog"
import { Search, Plus, MoreHorizontal, Mail, Phone, Calendar } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// Mock data
const staffMembers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    role: "Administrator",
    department: "Management",
    status: "active",
    lastLogin: "2024-01-15 09:30 AM",
    joinDate: "2023-01-15",
    avatar: "/placeholder.svg?height=40&width=40",
    performance: {
      efficiency: 95,
      totalSales: 125000,
      ordersProcessed: 450,
      customersServed: 320,
    },
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 234-5678",
    role: "Manager",
    department: "Sales",
    status: "active",
    lastLogin: "2024-01-15 08:45 AM",
    joinDate: "2023-03-20",
    avatar: "/placeholder.svg?height=40&width=40",
    performance: {
      efficiency: 88,
      totalSales: 98000,
      ordersProcessed: 380,
      customersServed: 280,
    },
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike.davis@company.com",
    phone: "+1 (555) 345-6789",
    role: "Cashier",
    department: "Sales",
    status: "active",
    lastLogin: "2024-01-15 10:15 AM",
    joinDate: "2023-06-10",
    avatar: "/placeholder.svg?height=40&width=40",
    performance: {
      efficiency: 92,
      totalSales: 75000,
      ordersProcessed: 520,
      customersServed: 450,
    },
  },
  {
    id: 4,
    name: "Emily Chen",
    email: "emily.chen@company.com",
    phone: "+1 (555) 456-7890",
    role: "Inventory Specialist",
    department: "Operations",
    status: "inactive",
    lastLogin: "2024-01-10 04:30 PM",
    joinDate: "2023-08-05",
    avatar: "/placeholder.svg?height=40&width=40",
    performance: {
      efficiency: 85,
      totalSales: 0,
      ordersProcessed: 0,
      customersServed: 0,
    },
  },
]

export function StaffList() {
  const [selectedStaff, setSelectedStaff] = useState<(typeof staffMembers)[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddDialog, setShowAddDialog] = useState(false)

  const filteredStaff = staffMembers.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || staff.role === roleFilter
    const matchesStatus = statusFilter === "all" || staff.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Administrator":
        return "bg-purple-100 text-purple-800"
      case "Manager":
        return "bg-blue-100 text-blue-800"
      case "Cashier":
        return "bg-green-100 text-green-800"
      case "Inventory Specialist":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staffMembers.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staffMembers.filter((s) => s.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Currently online</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Recent hires</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Staff Directory</CardTitle>
              <CardDescription>Manage your team members and their access permissions</CardDescription>
            </div>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Staff
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Administrator">Administrator</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Cashier">Cashier</SelectItem>
                <SelectItem value="Inventory Specialist">Inventory Specialist</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Staff List */}
          <div className="space-y-4">
            {filteredStaff.map((staff) => (
              <div
                key={staff.id}
                className={cn(
                  "flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer",
                  selectedStaff === staff && "bg-muted border-primary",
                )}
                onClick={() => setSelectedStaff(staff)}
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={staff.avatar || "/placeholder.svg"} alt={staff.name} />
                    <AvatarFallback>
                      {staff.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{staff.name}</h3>
                      <Badge className={getStatusColor(staff.status)}>{staff.status}</Badge>
                      <Badge className={getRoleColor(staff.role)}>{staff.role}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center">
                        <Mail className="mr-1 h-3 w-3" />
                        {staff.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="mr-1 h-3 w-3" />
                        {staff.phone}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        Joined {new Date(staff.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">Performance: {staff.performance.efficiency}%</div>
                    <div className="text-xs text-muted-foreground">Last login: {staff.lastLogin}</div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setSelectedStaff(staff)}>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                      <DropdownMenuItem>Reset Password</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        {staff.status === "active" ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Staff Details Modal */}
      {selectedStaff && (
        <StaffDetails staff={selectedStaff} open={!!selectedStaff} onOpenChange={() => setSelectedStaff(null)} />
      )}

      {/* Add Staff Dialog */}
      <AddStaffDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  )
}
