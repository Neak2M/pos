"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, Calendar, CreditCard, Edit, Mail, MapPin, Phone, Star, Tag, User } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PurchaseHistory } from "@/components/customers/purchase-history"
import { LoyaltyPoints } from "@/components/customers/loyalty-points"
import { CustomerNotes } from "@/components/customers/customer-notes"

interface CustomerDetailsProps {
  customer: {
    id: number
    name: string
    email: string
    phone: string
    address: string
    joinDate: string
    totalSpent: number
    totalOrders: number
    lastPurchase: string
    status: string
    loyaltyPoints: number
    avatar: string
    tags: string[]
  }
  onBack: () => void
}

export function CustomerDetails({ customer, onBack }: CustomerDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Customer Details</h2>
          <p className="text-muted-foreground">View and manage customer information</p>
        </div>
        <div className="ml-auto">
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Customer
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4 h-24 w-24">
                <Image
                  src={customer.avatar || "/placeholder.svg"}
                  alt={customer.name}
                  fill
                  className="rounded-full object-cover"
                />
                {customer.tags.includes("VIP") && (
                  <div className="absolute -right-1 -top-1 rounded-full bg-amber-500 p-1">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold">{customer.name}</h3>
              <p className="text-sm text-muted-foreground">Customer #{customer.id}</p>
              <div className="mt-2 flex flex-wrap justify-center gap-1">
                {customer.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{customer.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{customer.phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{customer.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Joined {new Date(customer.joinDate).toLocaleDateString()}</span>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-lg font-bold">${customer.totalSpent.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Orders</p>
                  <p className="text-lg font-bold">{customer.totalOrders}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Purchase</p>
                  <p className="text-lg font-bold">{new Date(customer.lastPurchase).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Loyalty Points</p>
                  <p className="text-lg font-bold">{customer.loyaltyPoints}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-5">
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="purchases">Purchase History</TabsTrigger>
                <TabsTrigger value="loyalty">Loyalty & Notes</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="overview" className="space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-medium">Customer Summary</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Last purchase</span>
                          </div>
                          <span className="text-sm font-medium">
                            {new Date(customer.lastPurchase).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Account status</span>
                          </div>
                          <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                            {customer.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Customer type</span>
                          </div>
                          <span className="text-sm font-medium">
                            {customer.tags.includes("VIP") ? "VIP" : "Regular"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Spending Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Average order value</span>
                          <span className="text-sm font-medium">
                            ${(customer.totalSpent / customer.totalOrders).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Purchase frequency</span>
                          <span className="text-sm font-medium">
                            {(customer.totalOrders / 12).toFixed(1)} orders/month
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Lifetime value</span>
                          <span className="text-sm font-medium">${customer.totalSpent.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-medium">Recent Purchases</h3>
                <PurchaseHistory customerId={customer.id} limit={5} />
              </div>
            </TabsContent>

            <TabsContent value="purchases">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Complete Purchase History</h3>
                  <Button variant="outline" size="sm">
                    Export History
                  </Button>
                </div>
                <PurchaseHistory customerId={customer.id} />
              </div>
            </TabsContent>

            <TabsContent value="loyalty" className="space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-medium">Loyalty Program</h3>
                <LoyaltyPoints customer={customer} />
              </div>
              <div>
                <h3 className="mb-4 text-lg font-medium">Customer Notes</h3>
                <CustomerNotes customerId={customer.id} />
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
