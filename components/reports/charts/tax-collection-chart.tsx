"use client"

import { useTheme } from "next-themes"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent } from "@/components/ui/card"

interface TaxCollectionChartProps {
  data: Array<{
    date: string
    taxCollected: number
    taxableRevenue: number
    transactions: number
  }>
  period: string
}

export function TaxCollectionChart({ data, period }: TaxCollectionChartProps) {
  const { theme: mode } = useTheme()
  const textColor = mode === "dark" ? "#f8fafc" : "#475569"

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
        <LineChart data={data}>
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
                        <p className="text-sm font-bold">${payload[0].value?.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">{payload[0].payload.transactions} transactions</p>
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
            dataKey="taxCollected"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            activeDot={{ r: 6, fill: "hsl(var(--chart-1))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
