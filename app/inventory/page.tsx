"use client"

import { useState } from "react"
import { AlertTriangle, ArrowDown, ArrowUp, Box, DollarSign, Package, TrendingUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample inventory data
const inventoryItems = [
  {
    id: 1,
    name: "Wireless Earbuds",
    sku: "WE001",
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    unitCost: 65.0,
    totalValue: 2925.0,
    status: "good",
    lastRestocked: "2024-01-15",
  },
  {
    id: 2,
    name: "Smart Watch",
    sku: "SW002",
    currentStock: 23,
    minStock: 15,
    maxStock: 80,
    unitCost: 120.0,
    totalValue: 2760.0,
    status: "good",
    lastRestocked: "2024-01-10",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    sku: "BS003",
    currentStock: 12,
    minStock: 25,
    maxStock: 75,
    unitCost: 45.0,
    totalValue: 540.0,
    status: "low",
    lastRestocked: "2024-01-05",
  },
  {
    id: 4,
    name: "Laptop Sleeve",
    sku: "LS004",
    currentStock: 67,
    minStock: 30,
    maxStock: 100,
    unitCost: 15.0,
    totalValue: 1005.0,
    status: "good",
    lastRestocked: "2024-01-12",
  },
  {
    id: 5,
    name: "Wireless Charger",
    sku: "WC005",
    currentStock: 0,
    minStock: 20,
    maxStock: 60,
    unitCost: 25.0,
    totalValue: 0.0,
    status: "out",
    lastRestocked: "2023-12-20",
  },
]

// Sample stock movements
const stockMovements = [
  {
    id: 1,
    product: "Wireless Earbuds",
    type: "in",
    quantity: 50,
    reason: "Purchase Order #1234",
    date: "2024-01-15",
    user: "John Doe",
  },
  {
    id: 2,
    product: "Smart Watch",
    type: "out",
    quantity: 5,
    reason: "Sale #5678",
    date: "2024-01-14",
    user: "Jane Smith",
  },
  {
    id: 3,
    product: "Bluetooth Speaker",
    type: "out",
    quantity: 3,
    reason: "Sale #5679",
    date: "2024-01-14",
    user: "Mike Johnson",
  },
  {
    id: 4,
    product: "Laptop Sleeve",
    type: "in",
    quantity: 25,
    reason: "Purchase Order #1235",
    date: "2024-01-12",
    user: "John Doe",
  },
]

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const getStockStatus = (item: any) => {
    if (item.currentStock === 0) return "out"
    if (item.currentStock <= item.minStock) return "low"
    return "good"
  }

  const getStockProgress = (item: any) => {
    return (item.currentStock / item.maxStock) * 100
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "good":
        return <Badge variant="default">Good</Badge>
      case "low":
        return <Badge variant="secondary">Low Stock</Badge>
      case "out":
        return <Badge variant="destructive">Out of Stock</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const totalInventoryValue = inventoryItems.reduce((sum, item) => sum + item.totalValue, 0)
  const lowStockItems = inventoryItems.filter((item) => getStockStatus(item) === "low").length
  const outOfStockItems = inventoryItems.filter((item) => getStockStatus(item) === "out").length

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground">Monitor and manage your stock levels</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Package className="mr-2 h-4 w-4" />
            Stock Adjustment
          </Button>
          <Button>
            <TrendingUp className="mr-2 h-4 w-4" />
            Purchase Order
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalInventoryValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Box className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryItems.length}</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">Items need restocking</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{outOfStockItems}</div>
            <p className="text-xs text-muted-foreground">Items unavailable</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Stock Overview</TabsTrigger>
          <TabsTrigger value="movements">Stock Movements</TabsTrigger>
          <TabsTrigger value="valuation">Inventory Valuation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Stock Levels</CardTitle>
              <CardDescription>Monitor your inventory levels and stock status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Current Stock</TableHead>
                      <TableHead>Stock Level</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Restocked</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.sku}</TableCell>
                        <TableCell>{item.currentStock}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={getStockProgress(item)} className="w-[60px]" />
                            <span className="text-xs text-muted-foreground">{Math.round(getStockProgress(item))}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(getStockStatus(item))}</TableCell>
                        <TableCell>{item.lastRestocked}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Adjust Stock
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Stock Movements</CardTitle>
              <CardDescription>Track all inventory changes and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>User</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockMovements.map((movement) => (
                      <TableRow key={movement.id}>
                        <TableCell className="font-medium">{movement.product}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {movement.type === "in" ? (
                              <ArrowUp className="h-4 w-4 text-green-600" />
                            ) : (
                              <ArrowDown className="h-4 w-4 text-red-600" />
                            )}
                            <span className="capitalize">{movement.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>{movement.quantity}</TableCell>
                        <TableCell>{movement.reason}</TableCell>
                        <TableCell>{movement.date}</TableCell>
                        <TableCell>{movement.user}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="valuation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Valuation</CardTitle>
              <CardDescription>View the monetary value of your current inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Current Stock</TableHead>
                      <TableHead>Unit Cost</TableHead>
                      <TableHead className="text-right">Total Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.sku}</TableCell>
                        <TableCell>{item.currentStock}</TableCell>
                        <TableCell>${item.unitCost.toFixed(2)}</TableCell>
                        <TableCell className="text-right font-medium">${item.totalValue.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 flex justify-end">
                <div className="rounded-md bg-muted p-4">
                  <div className="text-sm text-muted-foreground">Total Inventory Value</div>
                  <div className="text-2xl font-bold">${totalInventoryValue.toFixed(2)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
