"use client"

import { useTheme } from "next-themes"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { Card, CardContent } from "@/components/ui/card"

const data = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Food & Beverage", value: 20 },
  { name: "Home & Garden", value: 15 },
  { name: "Other", value: 5 },
]

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

export function CategorySalesChart() {
  const { theme: mode } = useTheme()
  const textColor = mode === "dark" ? "#f8fafc" : "#475569"

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
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
                        <p className="text-sm font-medium">{payload[0].name}</p>
                        <p className="text-sm font-bold">{payload[0].value}%</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              }
              return null
            }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ fontSize: "12px", color: textColor }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
