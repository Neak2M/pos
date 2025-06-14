"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SalesChart } from "@/components/reports/charts/sales-chart"
import { TopProductsChart } from "@/components/reports/charts/top-products-chart"
import { SalesByStaffChart } from "@/components/reports/charts/sales-by-staff-chart"

interface SalesReportsProps {
  dateRange: { from: Date; to: Date }
  period: string
}

// Sample sales data
const salesData = [
  { date: "2024-01-01", revenue: 2450.75, orders: 24, customers: 18 },
  { date: "2024-01-02", revenue: 3200.5, orders: 32, customers: 25 },
  { date: "2024-01-03", revenue: 1875.25, orders: 19, customers: 15 },
  { date: "2024-01-04", revenue: 4100.0, orders: 41, customers: 33 },
  { date: "2024-01-05", revenue: 2890.75, orders: 29, customers: 22 },
]

const topProducts = [
  { name: "Wireless Earbuds", revenue: 12450.0, quantity: 96, growth: 15.2 },
  { name: "Smart Watch", revenue: 9800.0, quantity: 49, growth: 8.7 },
  { name: "Bluetooth Speaker", revenue: 7200.0, quantity: 80, growth: -2.1 },
  { name: "Laptop Sleeve", revenue: 4500.0, quantity: 150, growth: 22.5 },
  { name: "Wireless Charger", revenue: 3750.0, quantity: 75, growth: 12.8 },
]

const salesByStaff = [
  { name: "John Doe", sales: 25430.75, orders: 254, commission: 1271.54 },
  { name: "Jane Smith", sales: 22100.5, orders: 221, commission: 1105.03 },
  { name: "Mike Johnson", sales: 18750.25, orders: 188, commission: 937.51 },
  { name: "Sarah Wilson", sales: 15200.0, orders: 152, commission: 760.0 },
]

const salesByCategory = [
  { category: "Electronics", revenue: 45230.75, percentage: 65.2, growth: 12.5 },
  { category: "Accessories", revenue: 18450.5, percentage: 26.6, growth: 8.3 },
  { category: "Home", revenue: 5680.25, percentage: 8.2, growth: -1.2 },
]

export function SalesReports({ dateRange, period }: SalesReportsProps) {
  const [reportType, setReportType] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Sales Reports</h2>
        <Select value={reportType} onValueChange={setReportType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="overview">Sales Overview</SelectItem>
            <SelectItem value="products">Product Performance</SelectItem>
            <SelectItem value="staff">Staff Performance</SelectItem>
            <SelectItem value="categories">Category Analysis</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={reportType} onValueChange={setReportType}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,903</div>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  +12.5%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orders per Day</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">29</div>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  +8.2%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customers per Day</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  +5.7%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12.5%</div>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  vs last period
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sales Trend</CardTitle>
              <CardDescription>Revenue and order trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <SalesChart data={salesData} period={period} />
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Daily Sales Summary</CardTitle>
                <CardDescription>Breakdown of daily performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead>Customers</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {salesData.map((day) => (
                        <TableRow key={day.date}>
                          <TableCell>{new Date(day.date).toLocaleDateString()}</TableCell>
                          <TableCell>${day.revenue.toLocaleString()}</TableCell>
                          <TableCell>{day.orders}</TableCell>
                          <TableCell>{day.customers}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>Revenue distribution across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesByCategory.map((category) => (
                    <div key={category.category} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{category.category}</span>
                          <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                        </div>
                        <div className="mt-1 h-2 rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: `${category.percentage}%` }} />
                        </div>
                        <div className="mt-1 flex items-center justify-between text-sm">
                          <span>${category.revenue.toLocaleString()}</span>
                          <span className={category.growth >= 0 ? "text-green-600" : "text-red-600"}>
                            {category.growth >= 0 ? "+" : ""}
                            {category.growth}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Best performing products by revenue and quantity</CardDescription>
            </CardHeader>
            <CardContent>
              <TopProductsChart data={topProducts} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Performance Details</CardTitle>
              <CardDescription>Detailed breakdown of product sales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Quantity Sold</TableHead>
                      <TableHead>Avg Price</TableHead>
                      <TableHead>Growth</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topProducts.map((product) => (
                      <TableRow key={product.name}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>${product.revenue.toLocaleString()}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>${(product.revenue / product.quantity).toFixed(2)}</TableCell>
                        <TableCell>
                          <div
                            className={`flex items-center ${product.growth >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {product.growth >= 0 ? (
                              <ArrowUp className="mr-1 h-3 w-3" />
                            ) : (
                              <ArrowDown className="mr-1 h-3 w-3" />
                            )}
                            {Math.abs(product.growth)}%
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Staff Member</CardTitle>
              <CardDescription>Individual staff performance and commissions</CardDescription>
            </CardHeader>
            <CardContent>
              <SalesByStaffChart data={salesByStaff} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Staff Performance Details</CardTitle>
              <CardDescription>Detailed breakdown of staff sales performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff Member</TableHead>
                      <TableHead>Total Sales</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Avg Order Value</TableHead>
                      <TableHead>Commission</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesByStaff.map((staff) => (
                      <TableRow key={staff.name}>
                        <TableCell className="font-medium">{staff.name}</TableCell>
                        <TableCell>${staff.sales.toLocaleString()}</TableCell>
                        <TableCell>{staff.orders}</TableCell>
                        <TableCell>${(staff.sales / staff.orders).toFixed(2)}</TableCell>
                        <TableCell>${staff.commission.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
              <CardDescription>Sales performance across product categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {salesByCategory.map((category) => (
                  <div key={category.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{category.category}</h4>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{category.percentage}% of total</span>
                        <span className={`text-sm ${category.growth >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {category.growth >= 0 ? "+" : ""}
                          {category.growth}%
                        </span>
                      </div>
                    </div>
                    <div className="h-3 rounded-full bg-muted">
                      <div className="h-3 rounded-full bg-primary" style={{ width: `${category.percentage}%` }} />
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Revenue: ${category.revenue.toLocaleString()}</span>
                      <span>
                        Growth: {category.growth >= 0 ? "+" : ""}
                        {category.growth}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
