"use client"

import { useTheme } from "next-themes"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { Card, CardContent } from "@/components/ui/card"

interface TaxByRateChartProps {
  data: Array<{
    rate: number
    description: string
    revenue: number
    tax: number
    transactions: number
  }>
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

export function TaxByRateChart({ data }: TaxByRateChartProps) {
  const { theme: mode } = useTheme()

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="tax"
            label={({ description, rate }) => `${description} (${rate}%)`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <Card>
                    <CardContent className="py-2 px-3">
                      <div className="grid gap-0.5">
                        <p className="text-sm font-medium">{payload[0].payload.description}</p>
                        <p className="text-sm font-bold">${payload[0].value?.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{payload[0].payload.rate}% tax rate</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              }
              return null
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
