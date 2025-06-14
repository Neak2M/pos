"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, Building2, Calendar, Edit, Globe, Mail, MapPin, Package, Phone, Star, Truck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SupplierOrderHistory } from "@/components/suppliers/supplier-order-history"
import { SuppliedProducts } from "@/components/suppliers/supplied-products"
import { SupplierPerformance } from "@/components/suppliers/supplier-performance"

interface SupplierDetailsProps {
  supplier: {
    id: number
    name: string
    contactPerson: string
    email: string
    phone: string
    address: string
    website: string
    status: string
    rating: number
    totalOrders: number
    totalSpent: number
    lastOrderDate: string
    paymentTerms: string
    leadTime: string
    categories: string[]
    logo: string
  }
  onBack: () => void
}

export function SupplierDetails({ supplier, onBack }: SupplierDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const getRatingStars = (rating: number) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Supplier Details</h2>
          <p className="text-muted-foreground">View and manage supplier information</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline">
            <Package className="mr-2 h-4 w-4" />
            Create Purchase Order
          </Button>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Supplier
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4 h-24 w-24">
                <Image
                  src={supplier.logo || "/placeholder.svg"}
                  alt={supplier.name}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">{supplier.name}</h3>
              <p className="text-sm text-muted-foreground">Supplier #{supplier.id}</p>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant={supplier.status === "active" ? "default" : "secondary"}>{supplier.status}</Badge>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">{supplier.rating}</span>
                  <span className="text-xs text-amber-500">{getRatingStars(supplier.rating)}</span>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap justify-center gap-1">
                {supplier.categories.map((category) => (
                  <Badge key={category} variant="outline">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{supplier.contactPerson}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{supplier.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{supplier.phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{supplier.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{supplier.website}</span>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Payment Terms</span>
                  <span className="text-sm font-medium">{supplier.paymentTerms}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Lead Time</span>
                  <span className="text-sm font-medium">{supplier.leadTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Order</span>
                  <span className="text-sm font-medium">{new Date(supplier.lastOrderDate).toLocaleDateString()}</span>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-lg font-bold">{supplier.totalOrders}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-lg font-bold">${supplier.totalSpent.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-5">
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="orders">Order History</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="overview" className="space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-medium">Supplier Summary</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Business Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Partnership since</span>
                          </div>
                          <span className="text-sm font-medium">Jan 2023</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Delivery method</span>
                          </div>
                          <span className="text-sm font-medium">Standard shipping</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Preferred supplier</span>
                          </div>
                          <Badge variant="default">Yes</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Order Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Average order value</span>
                          <span className="text-sm font-medium">
                            ${(supplier.totalSpent / supplier.totalOrders).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Order frequency</span>
                          <span className="text-sm font-medium">
                            {(supplier.totalOrders / 12).toFixed(1)} orders/month
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">On-time delivery</span>
                          <span className="text-sm font-medium">95%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-medium">Recent Orders</h3>
                <SupplierOrderHistory supplierId={supplier.id} limit={5} />
              </div>
            </TabsContent>

            <TabsContent value="products">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Supplied Products</h3>
                  <Button variant="outline" size="sm">
                    Add Product
                  </Button>
                </div>
                <SuppliedProducts supplierId={supplier.id} />
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Complete Order History</h3>
                  <Button variant="outline" size="sm">
                    Export History
                  </Button>
                </div>
                <SupplierOrderHistory supplierId={supplier.id} />
              </div>
            </TabsContent>

            <TabsContent value="performance">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Supplier Performance Metrics</h3>
                <SupplierPerformance supplier={supplier} />
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
