"use client"

import { useState } from "react"
import { AlertTriangle, ArrowDown, ArrowUp, Box, DollarSign, Package, TrendingDown } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InventoryValueChart } from "@/components/reports/charts/inventory-value-chart"
import { StockMovementChart } from "@/components/reports/charts/stock-movement-chart"

interface InventoryReportsProps {
  dateRange: { from: Date; to: Date }
  period: string
}

// Sample inventory data
const inventoryOverview = {
  totalValue: 89750.25,
  totalItems: 1247,
  lowStockItems: 12,
  outOfStockItems: 3,
  averageValue: 71.98,
  turnoverRate: 4.2,
}

const stockLevels = [
  {
    name: "Wireless Earbuds",
    sku: "WE001",
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    unitCost: 65.0,
    totalValue: 2925.0,
    status: "good",
    turnover: 8.5,
  },
  {
    name: "Smart Watch",
    sku: "SW002",
    currentStock: 23,
    minStock: 15,
    maxStock: 80,
    unitCost: 120.0,
    totalValue: 2760.0,
    status: "good",
    turnover: 6.2,
  },
  {
    name: "Bluetooth Speaker",
    sku: "BS003",
    currentStock: 12,
    minStock: 25,
    maxStock: 75,
    unitCost: 45.0,
    totalValue: 540.0,
    status: "low",
    turnover: 12.1,
  },
  {
    name: "Laptop Sleeve",
    sku: "LS004",
    currentStock: 67,
    minStock: 30,
    maxStock: 100,
    unitCost: 15.0,
    totalValue: 1005.0,
    status: "good",
    turnover: 4.8,
  },
  {
    name: "Wireless Charger",
    sku: "WC005",
    currentStock: 0,
    minStock: 20,
    maxStock: 60,
    unitCost: 25.0,
    totalValue: 0.0,
    status: "out",
    turnover: 0,
  },
]

const stockMovements = [
  { date: "2024-01-20", product: "Wireless Earbuds", type: "in", quantity: 50, reason: "Purchase Order" },
  { date: "2024-01-19", product: "Smart Watch", type: "out", quantity: 5, reason: "Sale" },
  { date: "2024-01-18", product: "Bluetooth Speaker", type: "out", quantity: 8, reason: "Sale" },
  { date: "2024-01-17", product: "Laptop Sleeve", type: "in", quantity: 25, reason: "Purchase Order" },
  { date: "2024-01-16", product: "Wireless Charger", type: "out", quantity: 3, reason: "Sale" },
]

const categoryAnalysis = [
  { category: "Electronics", value: 65430.75, items: 856, percentage: 72.9, growth: 8.5 },
  { category: "Accessories", value: 18450.5, items: 312, percentage: 20.6, growth: 12.3 },
  { category: "Home", value: 5869.0, items: 79, percentage: 6.5, growth: -2.1 },
]

const reorderRecommendations = [
  { name: "Bluetooth Speaker", currentStock: 12, minStock: 25, recommended: 40, urgency: "high" },
  { name: "Wireless Charger", currentStock: 0, minStock: 20, recommended: 50, urgency: "critical" },
  { name: "Fitness Tracker", currentStock: 18, minStock: 15, recommended: 30, urgency: "medium" },
  { name: "Phone Case", currentStock: 8, minStock: 20, recommended: 35, urgency: "high" },
]

export function InventoryReports({ dateRange, period }: InventoryReportsProps) {
  const [reportType, setReportType] = useState("overview")

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

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "high":
        return <Badge className="bg-orange-500">High</Badge>
      case "medium":
        return <Badge variant="secondary">Medium</Badge>
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">{urgency}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Inventory Reports</h2>
        <Select value={reportType} onValueChange={setReportType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="overview">Inventory Overview</SelectItem>
            <SelectItem value="levels">Stock Levels</SelectItem>
            <SelectItem value="movements">Stock Movements</SelectItem>
            <SelectItem value="reorder">Reorder Analysis</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={reportType} onValueChange={setReportType}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="levels">Stock Levels</TabsTrigger>
          <TabsTrigger value="movements">Movements</TabsTrigger>
          <TabsTrigger value="reorder">Reorder</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${inventoryOverview.totalValue.toLocaleString()}</div>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  +5.2%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inventoryOverview.totalItems.toLocaleString()}</div>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  +2.1%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inventoryOverview.lowStockItems}</div>
                <div className="flex items-center text-xs text-red-600">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  +3 items
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
                <Box className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inventoryOverview.outOfStockItems}</div>
                <div className="flex items-center text-xs text-red-600">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  +1 item
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Item Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${inventoryOverview.averageValue.toFixed(2)}</div>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  +3.1%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Turnover Rate</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inventoryOverview.turnoverRate}x</div>
                <div className="flex items-center text-xs text-muted-foreground">per year</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Inventory Value Trend</CardTitle>
              <CardDescription>Total inventory value over time</CardDescription>
            </CardHeader>
            <CardContent>
              <InventoryValueChart period={period} />
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Inventory by Category</CardTitle>
                <CardDescription>Value distribution across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryAnalysis.map((category) => (
                    <div key={category.category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{category.category}</span>
                        <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary" style={{ width: `${category.percentage}%` }} />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>${category.value.toLocaleString()}</span>
                        <span className={category.growth >= 0 ? "text-green-600" : "text-red-600"}>
                          {category.growth >= 0 ? "+" : ""}
                          {category.growth}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stock Alerts</CardTitle>
                <CardDescription>Items requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stockLevels
                    .filter((item) => getStockStatus(item) !== "good")
                    .map((item) => (
                      <div key={item.sku} className="flex items-center justify-between p-3 rounded-md border">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.currentStock} / {item.maxStock} units
                          </div>
                        </div>
                        <div className="text-right">{getStatusBadge(getStockStatus(item))}</div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="levels" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Stock Levels</CardTitle>
              <CardDescription>Detailed view of all inventory items</CardDescription>
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
                      <TableHead>Unit Cost</TableHead>
                      <TableHead>Total Value</TableHead>
                      <TableHead>Turnover</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockLevels.map((item) => (
                      <TableRow key={item.sku}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.sku}</TableCell>
                        <TableCell>{item.currentStock}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={getStockProgress(item)} className="w-[60px]" />
                            <span className="text-xs text-muted-foreground">{Math.round(getStockProgress(item))}%</span>
                          </div>
                        </TableCell>
                        <TableCell>${item.unitCost.toFixed(2)}</TableCell>
                        <TableCell>${item.totalValue.toLocaleString()}</TableCell>
                        <TableCell>{item.turnover}x</TableCell>
                        <TableCell>{getStatusBadge(getStockStatus(item))}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stock Movement Trends</CardTitle>
              <CardDescription>Inventory in/out flow over time</CardDescription>
            </CardHeader>
            <CardContent>
              <StockMovementChart period={period} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Stock Movements</CardTitle>
              <CardDescription>Latest inventory transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockMovements.map((movement, index) => (
                      <TableRow key={index}>
                        <TableCell>{new Date(movement.date).toLocaleDateString()}</TableCell>
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reorder" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reorder Recommendations</CardTitle>
              <CardDescription>
                Items that need to be restocked based on current levels and sales velocity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Current Stock</TableHead>
                      <TableHead>Min Stock</TableHead>
                      <TableHead>Recommended Order</TableHead>
                      <TableHead>Urgency</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reorderRecommendations.map((item) => (
                      <TableRow key={item.name}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.currentStock}</TableCell>
                        <TableCell>{item.minStock}</TableCell>
                        <TableCell>{item.recommended}</TableCell>
                        <TableCell>{getUrgencyBadge(item.urgency)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <button className="text-sm text-blue-600 hover:underline">Create PO</button>
                            <button className="text-sm text-gray-600 hover:underline">Ignore</button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Reorder Summary</CardTitle>
                <CardDescription>Overview of reorder requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Critical items</span>
                    <span className="font-bold text-red-600">
                      {reorderRecommendations.filter((item) => item.urgency === "critical").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>High priority items</span>
                    <span className="font-bold text-orange-600">
                      {reorderRecommendations.filter((item) => item.urgency === "high").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Medium priority items</span>
                    <span className="font-bold">
                      {reorderRecommendations.filter((item) => item.urgency === "medium").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total recommended units</span>
                    <span className="font-bold">
                      {reorderRecommendations.reduce((sum, item) => sum + item.recommended, 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Bulk operations for reordering</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <button className="w-full p-3 text-left rounded-md border hover:bg-muted">
                    <div className="font-medium">Create PO for Critical Items</div>
                    <div className="text-sm text-muted-foreground">
                      Generate purchase orders for all critical stock items
                    </div>
                  </button>
                  <button className="w-full p-3 text-left rounded-md border hover:bg-muted">
                    <div className="font-medium">Auto-Reorder Setup</div>
                    <div className="text-sm text-muted-foreground">Configure automatic reordering rules</div>
                  </button>
                  <button className="w-full p-3 text-left rounded-md border hover:bg-muted">
                    <div className="font-medium">Export Reorder List</div>
                    <div className="text-sm text-muted-foreground">Download reorder recommendations as CSV</div>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
