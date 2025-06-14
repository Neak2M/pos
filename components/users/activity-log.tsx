"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Search, Download, Activity, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import type { DateRange } from "react-day-picker"

interface ActivityLogProps {
  staffId?: number
}

// Mock activity data
const activities = [
  {
    id: 1,
    userId: 1,
    userName: "John Smith",
    action: "Login",
    description: "User logged into the system",
    timestamp: "2024-01-15 09:30:15",
    ipAddress: "192.168.1.100",
    status: "success",
    module: "Authentication",
  },
  {
    id: 2,
    userId: 1,
    userName: "John Smith",
    action: "Create Sale",
    description: "Processed sale transaction #12345",
    timestamp: "2024-01-15 09:45:22",
    ipAddress: "192.168.1.100",
    status: "success",
    module: "Sales",
  },
  {
    id: 3,
    userId: 2,
    userName: "Sarah Johnson",
    action: "Update Product",
    description: "Modified product inventory for SKU-001",
    timestamp: "2024-01-15 10:15:33",
    ipAddress: "192.168.1.101",
    status: "success",
    module: "Inventory",
  },
  {
    id: 4,
    userId: 3,
    userName: "Mike Davis",
    action: "Failed Login",
    description: "Failed login attempt - incorrect password",
    timestamp: "2024-01-15 08:20:45",
    ipAddress: "192.168.1.102",
    status: "error",
    module: "Authentication",
  },
  {
    id: 5,
    userId: 1,
    userName: "John Smith",
    action: "Export Report",
    description: "Exported sales report for January 2024",
    timestamp: "2024-01-15 11:30:12",
    ipAddress: "192.168.1.100",
    status: "success",
    module: "Reports",
  },
  {
    id: 6,
    userId: 4,
    userName: "Emily Chen",
    action: "Create Purchase Order",
    description: "Created purchase order #PO-2024-001",
    timestamp: "2024-01-15 14:45:18",
    ipAddress: "192.168.1.103",
    status: "success",
    module: "Suppliers",
  },
  {
    id: 7,
    userId: 2,
    userName: "Sarah Johnson",
    action: "Delete Customer",
    description: "Attempted to delete customer record",
    timestamp: "2024-01-15 15:20:30",
    ipAddress: "192.168.1.101",
    status: "warning",
    module: "Customers",
  },
]

export function ActivityLog({ staffId }: ActivityLogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [actionFilter, setActionFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [moduleFilter, setModuleFilter] = useState("all")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  // Filter activities based on staffId if provided
  const filteredActivities = activities.filter((activity) => {
    const matchesStaff = !staffId || activity.userId === staffId
    const matchesSearch =
      activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.userName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesAction = actionFilter === "all" || activity.action === actionFilter
    const matchesStatus = statusFilter === "all" || activity.status === statusFilter
    const matchesModule = moduleFilter === "all" || activity.module === moduleFilter

    return matchesStaff && matchesSearch && matchesAction && matchesStatus && matchesModule
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const exportLog = () => {
    console.log("Exporting activity log...")
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Activity Log
            </CardTitle>
            <CardDescription>
              {staffId ? "User activity history and audit trail" : "System-wide activity monitoring and audit trail"}
            </CardDescription>
          </div>
          <Button variant="outline" onClick={exportLog}>
            <Download className="mr-2 h-4 w-4" />
            Export Log
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="Login">Login</SelectItem>
              <SelectItem value="Create Sale">Create Sale</SelectItem>
              <SelectItem value="Update Product">Update Product</SelectItem>
              <SelectItem value="Export Report">Export Report</SelectItem>
              <SelectItem value="Failed Login">Failed Login</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
            </SelectContent>
          </Select>
          <Select value={moduleFilter} onValueChange={setModuleFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Module" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Modules</SelectItem>
              <SelectItem value="Authentication">Authentication</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Inventory">Inventory</SelectItem>
              <SelectItem value="Reports">Reports</SelectItem>
              <SelectItem value="Suppliers">Suppliers</SelectItem>
              <SelectItem value="Customers">Customers</SelectItem>
            </SelectContent>
          </Select>
          <DatePickerWithRange date={dateRange} setDate={setDateRange} className="w-[300px]" />
        </div>

        {/* Activity List */}
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50">
              <div className="flex items-start space-x-4">
                <div className="mt-1">{getStatusIcon(activity.status)}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium">{activity.action}</h4>
                    <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                    <Badge variant="outline">{activity.module}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>User: {activity.userName}</span>
                    <span>IP: {activity.ipAddress}</span>
                    <span>Time: {activity.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredActivities.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No activities found matching your filters.</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
