"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { CreditCard, DollarSign, Settings, Plus, Trash2 } from "lucide-react"

export function PaymentSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, name: "Cash", enabled: true, instructions: "Accept cash payments" },
    { id: 2, name: "Credit Card", enabled: true, instructions: "Visa, MasterCard, American Express" },
    { id: 3, name: "Debit Card", enabled: true, instructions: "PIN required" },
    { id: 4, name: "Mobile Payment", enabled: false, instructions: "Apple Pay, Google Pay, Samsung Pay" },
  ])

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    toast({
      title: "Payment settings updated",
      description: "Your payment settings have been successfully updated.",
    })
  }

  const togglePaymentMethod = (id: number) => {
    setPaymentMethods((methods) =>
      methods.map((method) => (method.id === id ? { ...method, enabled: !method.enabled } : method)),
    )
  }

  const removePaymentMethod = (id: number) => {
    setPaymentMethods((methods) => methods.filter((method) => method.id !== id))
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Currency Settings
          </CardTitle>
          <CardDescription>Configure your store's currency and formatting preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select defaultValue="USD">
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                  <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currencySymbol">Currency Symbol</Label>
              <Input id="currencySymbol" placeholder="$" defaultValue="$" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="decimalPlaces">Decimal Places</Label>
              <Select defaultValue="2">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0 (No decimals)</SelectItem>
                  <SelectItem value="2">2 (Standard)</SelectItem>
                  <SelectItem value="3">3 (Precise)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currencyPosition">Symbol Position</Label>
              <Select defaultValue="before">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="before">Before amount ($100)</SelectItem>
                  <SelectItem value="after">After amount (100$)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Methods
          </CardTitle>
          <CardDescription>Manage accepted payment methods and their settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <Switch checked={method.enabled} onCheckedChange={() => togglePaymentMethod(method.id)} />
                <div>
                  <h4 className="font-medium">{method.name}</h4>
                  <p className="text-sm text-muted-foreground">{method.instructions}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => removePaymentMethod(method.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Payment Method
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Receipt Settings
          </CardTitle>
          <CardDescription>Customize receipt appearance and information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="receiptFooter">Receipt Footer Text</Label>
            <Textarea
              id="receiptFooter"
              placeholder="Thank you for your business!"
              defaultValue="Thank you for shopping with us! Visit us again soon."
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Tax Details</Label>
              <p className="text-sm text-muted-foreground">Display tax breakdown on receipts</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Print Customer Copy</Label>
              <p className="text-sm text-muted-foreground">Automatically print customer receipt</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Receipt Option</Label>
              <p className="text-sm text-muted-foreground">Offer email receipts to customers</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}
