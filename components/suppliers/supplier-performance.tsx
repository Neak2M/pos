"use client"

import { Calendar, Clock, DollarSign, Package, Star, TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface SupplierPerformanceProps {
  supplier: {
    id: number
    name: string
    rating: number
    totalOrders: number
    totalSpent: number
  }
}

export function SupplierPerformance({ supplier }: SupplierPerformanceProps) {
  // Sample performance metrics (in a real app, these would come from your database)
  const performanceMetrics = {
    onTimeDelivery: 95,
    qualityRating: 4.6,
    responseTime: 2.4, // hours
    priceCompetitiveness: 88,
    orderAccuracy: 97,
    communicationRating: 4.3,
  }

  const getRatingStars = (rating: number) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating))
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Delivery</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.onTimeDelivery}%</div>
            <Progress value={performanceMetrics.onTimeDelivery} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Excellent performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.qualityRating}</div>
            <div className="text-sm text-amber-500">{getRatingStars(performanceMetrics.qualityRating)}</div>
            <p className="text-xs text-muted-foreground mt-2">Above average quality</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.responseTime}h</div>
            <p className="text-xs text-muted-foreground mt-2">Average response time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Price Competitiveness</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.priceCompetitiveness}%</div>
            <Progress value={performanceMetrics.priceCompetitiveness} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Competitive pricing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Order Accuracy</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.orderAccuracy}%</div>
            <Progress value={performanceMetrics.orderAccuracy} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">High accuracy rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Communication</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.communicationRating}</div>
            <div className="text-sm text-amber-500">{getRatingStars(performanceMetrics.communicationRating)}</div>
            <p className="text-xs text-muted-foreground mt-2">Good communication</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Overall supplier performance analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium">Strengths</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  Excellent on-time delivery record
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  High order accuracy rate
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  Competitive pricing structure
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Areas for Improvement</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  Response time could be faster
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  Communication frequency
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-md bg-muted p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Overall Performance Score</h4>
                <p className="text-sm text-muted-foreground">Based on delivery, quality, and communication</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">4.5/5</div>
                <div className="text-sm text-amber-500">{getRatingStars(4.5)}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
