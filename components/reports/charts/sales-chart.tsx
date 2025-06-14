"use client"

import { useTheme } from "next-themes"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SalesChartProps {
  data: Array<{
    date: string
    revenue: number
    orders: number
    customers: number
  }>
  period: string
}

export function SalesChart({ data, period }: SalesChartProps) {
  const { theme: mode } = useTheme()
  const textColor = mode === "dark" ? "#f8fafc" : "#475569"
  const gridColor = mode === "dark" ? "#334155" : "#e2e8f0"

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    switch (period) {
      case "day":
        return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
      case "week":
        return `Week ${Math.ceil(date.getDate() / 7)}`
      case "month":
        return date.toLocaleDateString(undefined, { month: "short" })
      default:
        return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
    }
  }

  return (
    <Tabs defaultValue="revenue">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="revenue" className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis
              dataKey="date"
              stroke={textColor}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatDate}
            />
            <YAxis
              stroke={textColor}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card>
                      <CardContent className="py-2 px-3">
                        <div className="grid gap-0.5">
                          <p className="text-sm font-medium">{formatDate(payload[0].payload.date)}</p>
                          <p className="text-sm font-bold">${payload[0].value}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                }
                return null
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </TabsContent>
      <TabsContent value="orders" className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis
              dataKey="date"
              stroke={textColor}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatDate}
            />
            <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card>
                      <CardContent className="py-2 px-3">
                        <div className="grid gap-0.5">
                          <p className="text-sm font-medium">{formatDate(payload[0].payload.date)}</p>
                          <p className="text-sm font-bold">{payload[0].value} orders</p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </TabsContent>
      <TabsContent value="customers" className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis
              dataKey="date"
              stroke={textColor}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatDate}
            />
            <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card>
                      <CardContent className="py-2 px-3">
                        <div className="grid gap-0.5">
                          <p className="text-sm font-medium">{formatDate(payload[0].payload.date)}</p>
                          <p className="text-sm font-bold">{payload[0].value} customers</p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="customers" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </TabsContent>
    </Tabs>
  )
}
