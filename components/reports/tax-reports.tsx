"use client"

import { useState } from "react"
import { Calendar, DollarSign, FileText, Receipt, TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaxCollectionChart } from "@/components/reports/charts/tax-collection-chart"
import { TaxByRateChart } from "@/components/reports/charts/tax-by-rate-chart"

interface TaxReportsProps {
  dateRange: { from: Date; to: Date }
  period: string
}

// Sample tax data
const taxSummary = {
  totalTaxCollected: 10034.46,
  taxableRevenue: 125430.75,
  exemptRevenue: 5200.0,
  averageTaxRate: 8.0,
  totalTransactions: 1247,
  taxableTransactions: 1189,
}

const taxByRate = [
  { rate: 8.0, description: "Standard Rate", revenue: 118230.75, tax: 9458.46, transactions: 1089 },
  { rate: 5.0, description: "Reduced Rate", revenue: 7200.0, tax: 360.0, transactions: 72 },
  { rate: 0.0, description: "Exempt", revenue: 5200.0, tax: 0.0, transactions: 86 },
]

const dailyTaxCollection = [
  { date: "2024-01-01", taxCollected: 196.06, taxableRevenue: 2450.75, transactions: 24 },
  { date: "2024-01-02", taxCollected: 256.04, taxableRevenue: 3200.5, transactions: 32 },
  { date: "2024-01-03", taxCollected: 150.02, taxableRevenue: 1875.25, transactions: 19 },
  { date: "2024-01-04", taxCollected: 328.0, taxableRevenue: 4100.0, transactions: 41 },
  { date: "2024-01-05", taxCollected: 231.26, taxableRevenue: 2890.75, transactions: 29 },
]

const taxByCategory = [
  { category: "Electronics", revenue: 65430.75, tax: 5234.46, rate: 8.0 },
  { category: "Accessories", revenue: 18450.5, tax: 1476.04, rate: 8.0 },
  { category: "Services", revenue: 7200.0, tax: 360.0, rate: 5.0 },
  { category: "Books", revenue: 5200.0, tax: 0.0, rate: 0.0 },
]

const monthlyTaxSummary = [
  { month: "January", taxCollected: 10034.46, revenue: 125430.75, rate: 8.0 },
  { month: "December", taxCollected: 9245.32, revenue: 115566.5, rate: 8.0 },
  { month: "November", taxCollected: 8756.18, revenue: 109452.25, rate: 8.0 },
  { month: "October", taxCollected: 9123.45, revenue: 114043.13, rate: 8.0 },
]

export function TaxReports({ dateRange, period }: TaxReportsProps) {
  const [reportType, setReportType] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Tax Reports</h2>
        <Select value={reportType} onValueChange={setReportType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="overview">Tax Overview</SelectItem>
            <SelectItem value="rates">Tax by Rate</SelectItem>
            <SelectItem value="categories">Tax by Category</SelectItem>
            <SelectItem value="compliance">Compliance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={reportType} onValueChange={setReportType}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rates">By Rate</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tax Collected</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${taxSummary.totalTaxCollected.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12.5% from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxable Revenue</CardTitle>
                <Receipt className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${taxSummary.taxableRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">95.9% of total revenue</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Exempt Revenue</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${taxSummary.exemptRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">4.1% of total revenue</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Tax Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{taxSummary.averageTaxRate}%</div>
                <p className="text-xs text-muted-foreground">Effective rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxable Transactions</CardTitle>
                <Receipt className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{taxSummary.taxableTransactions.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {((taxSummary.taxableTransactions / taxSummary.totalTransactions) * 100).toFixed(1)}% of total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${(taxSummary.totalTaxCollected / 31).toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Tax per day</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tax Collection Trend</CardTitle>
              <CardDescription>Daily tax collection over time</CardDescription>
            </CardHeader>
            <CardContent>
              <TaxCollectionChart data={dailyTaxCollection} period={period} />
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Daily Tax Summary</CardTitle>
                <CardDescription>Breakdown of daily tax collection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Tax Collected</TableHead>
                        <TableHead>Taxable Revenue</TableHead>
                        <TableHead>Transactions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dailyTaxCollection.map((day) => (
                        <TableRow key={day.date}>
                          <TableCell>{new Date(day.date).toLocaleDateString()}</TableCell>
                          <TableCell>${day.taxCollected.toFixed(2)}</TableCell>
                          <TableCell>${day.taxableRevenue.toLocaleString()}</TableCell>
                          <TableCell>{day.transactions}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Comparison</CardTitle>
                <CardDescription>Tax collection by month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyTaxSummary.map((month) => (
                    <div key={month.month} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{month.month}</div>
                        <div className="text-sm text-muted-foreground">${month.revenue.toLocaleString()} revenue</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${month.taxCollected.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{month.rate}% rate</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tax Collection by Rate</CardTitle>
              <CardDescription>Breakdown of tax collection by different tax rates</CardDescription>
            </CardHeader>
            <CardContent>
              <TaxByRateChart data={taxByRate} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tax Rate Details</CardTitle>
              <CardDescription>Detailed breakdown of each tax rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tax Rate</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Tax Collected</TableHead>
                      <TableHead>Transactions</TableHead>
                      <TableHead>Avg per Transaction</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {taxByRate.map((rate) => (
                      <TableRow key={rate.rate}>
                        <TableCell className="font-medium">{rate.rate}%</TableCell>
                        <TableCell>{rate.description}</TableCell>
                        <TableCell>${rate.revenue.toLocaleString()}</TableCell>
                        <TableCell>${rate.tax.toLocaleString()}</TableCell>
                        <TableCell>{rate.transactions}</TableCell>
                        <TableCell>${(rate.revenue / rate.transactions).toFixed(2)}</TableCell>
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
              <CardTitle>Tax by Product Category</CardTitle>
              <CardDescription>Tax collection breakdown by product categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Tax Rate</TableHead>
                      <TableHead>Tax Collected</TableHead>
                      <TableHead>Percentage of Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {taxByCategory.map((category) => (
                      <TableRow key={category.category}>
                        <TableCell className="font-medium">{category.category}</TableCell>
                        <TableCell>${category.revenue.toLocaleString()}</TableCell>
                        <TableCell>{category.rate}%</TableCell>
                        <TableCell>${category.tax.toLocaleString()}</TableCell>
                        <TableCell>{((category.tax / taxSummary.totalTaxCollected) * 100).toFixed(1)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category Tax Analysis</CardTitle>
              <CardDescription>Visual breakdown of tax by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taxByCategory.map((category) => (
                  <div key={category.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category.category}</span>
                      <span className="text-sm text-muted-foreground">
                        {((category.tax / taxSummary.totalTaxCollected) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${(category.tax / taxSummary.totalTaxCollected) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>${category.tax.toLocaleString()} tax</span>
                      <span className="text-muted-foreground">{category.rate}% rate</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tax Compliance Summary</CardTitle>
              <CardDescription>Overview of tax compliance status and requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Filing Requirements</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-md border">
                      <div>
                        <div className="font-medium">Monthly Sales Tax</div>
                        <div className="text-sm text-muted-foreground">Due: 20th of next month</div>
                      </div>
                      <div className="text-green-600 font-medium">Current</div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-md border">
                      <div>
                        <div className="font-medium">Quarterly Report</div>
                        <div className="text-sm text-muted-foreground">Due: April 15th</div>
                      </div>
                      <div className="text-amber-600 font-medium">Upcoming</div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-md border">
                      <div>
                        <div className="font-medium">Annual Summary</div>
                        <div className="text-sm text-muted-foreground">Due: January 31st</div>
                      </div>
                      <div className="text-green-600 font-medium">Filed</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Tax Liability</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Current period tax</span>
                      <span className="font-bold">${taxSummary.totalTaxCollected.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Previous payments</span>
                      <span className="font-bold">$9,245.32</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Outstanding balance</span>
                      <span className="font-bold text-red-600">$789.14</span>
                    </div>
                    <div className="flex items-center justify-between border-t pt-2">
                      <span className="font-medium">Total liability</span>
                      <span className="font-bold">${(taxSummary.totalTaxCollected + 789.14).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Actions</CardTitle>
              <CardDescription>Required actions and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 rounded-md border border-red-200 bg-red-50">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="font-medium">Action Required</span>
                  </div>
                  <p className="text-sm mt-1">
                    Outstanding tax balance of $789.14 needs to be paid by February 20th to avoid penalties.
                  </p>
                </div>
                <div className="p-4 rounded-md border border-amber-200 bg-amber-50">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    <span className="font-medium">Upcoming Deadline</span>
                  </div>
                  <p className="text-sm mt-1">
                    Quarterly tax report due April 15th. Estimated tax liability: $30,103.38
                  </p>
                </div>
                <div className="p-4 rounded-md border border-green-200 bg-green-50">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="font-medium">Compliant</span>
                  </div>
                  <p className="text-sm mt-1">All monthly filings are up to date. Next filing due February 20th.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
