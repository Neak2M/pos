"use client"

import { useTheme } from "next-themes"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent } from "@/components/ui/card"

interface StockMovementChartProps {
  period: string
}

// Sample stock movement data
const movementData = [
  { date: "2024-01-01", stockIn: 120, stockOut: 85 },
  { date: "2024-01-02", stockIn: 95, stockOut: 110 },
  { date: "2024-01-03", stockIn: 150, stockOut: 75 },
  { date: "2024-01-04", stockIn: 80, stockOut: 95 },
  { date: "2024-01-05", stockIn: 200, stockOut: 120 },
]

export function StockMovementChart({ period }: StockMovementChartProps) {
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
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={movementData}>
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
                        <p className="text-sm">
                          <span className="text-green-600">In: {payload[0].payload.stockIn}</span>
                        </p>
                        <p className="text-sm">
                          <span className="text-red-600">Out: {payload[0].payload.stockOut}</span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              }
              return null
            }}
          />
          <Bar dataKey="stockIn" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
          <Bar dataKey="stockOut" fill="hsl(var(--chart-5))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
