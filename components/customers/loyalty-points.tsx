"use client"

import { Gift, History, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface LoyaltyPointsProps {
  customer: {
    id: number
    name: string
    loyaltyPoints: number
    totalSpent: number
  }
}

export function LoyaltyPoints({ customer }: LoyaltyPointsProps) {
  // Calculate next reward threshold
  const currentTier = Math.floor(customer.loyaltyPoints / 100)
  const nextTierThreshold = (currentTier + 1) * 100
  const progress = ((customer.loyaltyPoints % 100) / 100) * 100

  // Sample rewards based on points
  const availableRewards = [
    {
      id: 1,
      name: "10% Off Next Purchase",
      pointsCost: 100,
      isAvailable: customer.loyaltyPoints >= 100,
    },
    {
      id: 2,
      name: "Free Shipping",
      pointsCost: 150,
      isAvailable: customer.loyaltyPoints >= 150,
    },
    {
      id: 3,
      name: "$25 Store Credit",
      pointsCost: 250,
      isAvailable: customer.loyaltyPoints >= 250,
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Loyalty Program Status</CardTitle>
          <CardDescription>
            {customer.name} has earned {customer.loyaltyPoints} points through purchases and activities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Current Points</span>
            <span className="text-sm font-bold">{customer.loyaltyPoints} points</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress to next reward</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{customer.loyaltyPoints % 100} points</span>
              <span>{nextTierThreshold} points</span>
            </div>
          </div>
          <div className="rounded-md bg-muted p-3">
            <div className="flex items-center gap-3">
              <History className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Points History</p>
                <p className="text-xs text-muted-foreground">
                  Earned {customer.loyaltyPoints} points from {customer.totalOrders} orders
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {availableRewards.map((reward) => (
          <Card key={reward.id} className={!reward.isAvailable ? "opacity-60" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{reward.name}</CardTitle>
              <CardDescription>{reward.pointsCost} points</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Reward</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="sm" disabled={!reward.isAvailable} className="w-full">
                {reward.isAvailable ? "Redeem Reward" : "Not Enough Points"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How to Earn More Points</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <ShoppingBag className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Make a Purchase</p>
              <p className="text-sm text-muted-foreground">Earn 1 point for every $1 spent in our store</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Gift className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Birthday Bonus</p>
              <p className="text-sm text-muted-foreground">Get 50 bonus points during your birthday month</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <History className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Referral Program</p>
              <p className="text-sm text-muted-foreground">
                Earn 100 points for each friend you refer who makes a purchase
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
