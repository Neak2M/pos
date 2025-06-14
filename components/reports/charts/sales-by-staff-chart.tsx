"use client"

import { useTheme } from "next-themes"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent } from "@/components/ui/card"

interface SalesByStaffChartProps {
  data: Array<{
    name: string
    sales: number
    orders: number
    commission: number
  }>
}

export function SalesByStaffChart({ data }: SalesByStaffChartProps) {
  const { theme: mode } = useTheme()
  const textColor = mode === "dark" ? "#f8fafc" : "#475569"

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke={textColor}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            angle={-45}
            textAnchor="end"
            height={80}
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
                        <p className="text-sm font-medium">{payload[0].payload.name}</p>
                        <p className="text-sm font-bold">${payload[0].value?.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{payload[0].payload.orders} orders</p>
                        <p className="text-xs text-muted-foreground">
                          ${payload[0].payload.commission.toLocaleString()} commission
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              }
              return null
            }}
          />
          <Bar dataKey="sales" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
