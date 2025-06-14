"use client"

import { useTheme } from "next-themes"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent } from "@/components/ui/card"

interface InventoryValueChartProps {
  period: string
}

// Sample inventory value data
const inventoryData = [
  { date: "2024-01-01", value: 85430.75 },
  { date: "2024-01-02", value: 86200.5 },
  { date: "2024-01-03", value: 84875.25 },
  { date: "2024-01-04", value: 87100.0 },
  { date: "2024-01-05", value: 89750.25 },
]

export function InventoryValueChart({ period }: InventoryValueChartProps) {
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
        <AreaChart data={inventoryData}>
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
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <Card>
                    <CardContent className="py-2 px-3">
                      <div className="grid gap-0.5">
                        <p className="text-sm font-medium">{formatDate(payload[0].payload.date)}</p>
                        <p className="text-sm font-bold">${payload[0].value?.toLocaleString()}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              }
              return null
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--chart-4))"
            fill="hsl(var(--chart-4))"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
