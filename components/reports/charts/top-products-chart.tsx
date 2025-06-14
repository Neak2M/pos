"use client"

import { useTheme } from "next-themes"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent } from "@/components/ui/card"

interface TopProductsChartProps {
  data: Array<{
    name: string
    revenue: number
    quantity: number
    growth: number
  }>
}

export function TopProductsChart({ data }: TopProductsChartProps) {
  const { theme: mode } = useTheme()
  const textColor = mode === "dark" ? "#f8fafc" : "#475569"

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="horizontal">
          <XAxis type="number" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            type="category"
            dataKey="name"
            stroke={textColor}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            width={120}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <Card>
                    <CardContent className="py-2 px-3">
                      <div className="grid gap-0.5">
                        <p className="text-sm font-medium">{payload[0].payload.name}</p>
                        <p className="text-sm font-bold">${payload[0].value?.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{payload[0].payload.quantity} units sold</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              }
              return null
            }}
          />
          <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
