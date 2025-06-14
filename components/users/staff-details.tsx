"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ActivityLog } from "./activity-log"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Mail, Phone, Calendar, MapPin, DollarSign, TrendingUp, Users, ShoppingCart, Edit, Shield } from "lucide-react"

interface StaffDetailsProps {
  staff: {
    id: number
    name: string
    email: string
    phone: string
    role: string
    department: string
    status: string
    lastLogin: string
    joinDate: string
    avatar: string
    performance: {
      efficiency: number
      totalSales: number
      ordersProcessed: number
      customersServed: number
    }
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StaffDetails({ staff, open, onOpenChange }: StaffDetailsProps) {
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

  // Mock additional data
  const additionalInfo = {
    address: "123 Main St, City, State 12345",
    emergencyContact: "+1 (555) 987-6543",
    employeeId: "EMP-" + staff.id.toString().padStart(4, "0"),
    salary: "$45,000",
    workSchedule: "Monday - Friday, 9:00 AM - 5:00 PM",
    permissions: ["Sales Management", "Customer Service", "Inventory View", "Reports Access"],
  }

  const performanceMetrics = [
    {
      label: "Sales Performance",
      value: staff.performance.efficiency,
      color: "bg-blue-500",
      icon: TrendingUp,
    },
    {
      label: "Customer Satisfaction",
      value: 92,
      color: "bg-green-500",
      icon: Users,
    },
    {
      label: "Order Accuracy",
      value: 98,
      color: "bg-purple-500",
      icon: ShoppingCart,
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Staff Details</DialogTitle>
          <DialogDescription>Comprehensive information about {staff.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={staff.avatar || "/placeholder.svg"} alt={staff.name} />
                    <AvatarFallback className="text-lg">
                      {staff.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-bold">{staff.name}</h3>
                    <p className="text-muted-foreground">{additionalInfo.employeeId}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge className={getStatusColor(staff.status)}>{staff.status}</Badge>
                      <Badge className={getRoleColor(staff.role)}>{staff.role}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <Shield className="mr-2 h-4 w-4" />
                    Manage Permissions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{staff.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">{staff.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Address</p>
                        <p className="text-sm text-muted-foreground">{additionalInfo.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Emergency Contact</p>
                        <p className="text-sm text-muted-foreground">{additionalInfo.emergencyContact}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Employment Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Employment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Join Date</p>
                        <p className="text-sm text-muted-foreground">{new Date(staff.joinDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Salary</p>
                        <p className="text-sm text-muted-foreground">{additionalInfo.salary}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Work Schedule</p>
                        <p className="text-sm text-muted-foreground">{additionalInfo.workSchedule}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Last Login</p>
                        <p className="text-sm text-muted-foreground">{staff.lastLogin}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              {/* Performance Metrics */}
              <div className="grid gap-4 md:grid-cols-3">
                {performanceMetrics.map((metric, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                          <p className="text-2xl font-bold">{metric.value}%</p>
                        </div>
                        <metric.icon className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <Progress value={metric.value} className="mt-3" />
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Sales Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Sales Statistics</CardTitle>
                  <CardDescription>Performance metrics for the current period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        ${staff.performance.totalSales.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">Total Sales</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{staff.performance.ordersProcessed}</p>
                      <p className="text-sm text-muted-foreground">Orders Processed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{staff.performance.customersServed}</p>
                      <p className="text-sm text-muted-foreground">Customers Served</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="permissions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Permissions</CardTitle>
                  <CardDescription>Permissions granted to {staff.name} based on their role</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 md:grid-cols-2">
                    {additionalInfo.permissions.map((permission, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="h-2 w-2 bg-green-500 rounded-full" />
                        <span className="text-sm">{permission}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <ActivityLog staffId={staff.id} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
