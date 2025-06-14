"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Calculator, Plus, Trash2, Percent } from "lucide-react"

export function TaxConfiguration() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [taxRates, setTaxRates] = useState([
    { id: 1, name: "Standard Rate", rate: 8.25, category: "General", enabled: true },
    { id: 2, name: "Food & Beverage", rate: 5.0, category: "Food", enabled: true },
    { id: 3, name: "Luxury Items", rate: 12.0, category: "Luxury", enabled: false },
  ])

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    toast({
      title: "Tax configuration updated",
      description: "Your tax settings have been successfully updated.",
    })
  }

  const toggleTaxRate = (id: number) => {
    setTaxRates((rates) => rates.map((rate) => (rate.id === id ? { ...rate, enabled: !rate.enabled } : rate)))
  }

  const removeTaxRate = (id: number) => {
    setTaxRates((rates) => rates.filter((rate) => rate.id !== id))
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Tax Calculation Settings
          </CardTitle>
          <CardDescription>Configure how taxes are calculated and displayed.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Tax Inclusive Pricing</Label>
              <p className="text-sm text-muted-foreground">Product prices include tax</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Round Tax Amounts</Label>
              <p className="text-sm text-muted-foreground">Round tax calculations to nearest cent</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="taxRounding">Tax Rounding Method</Label>
              <Select defaultValue="nearest">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nearest">Round to Nearest</SelectItem>
                  <SelectItem value="up">Round Up</SelectItem>
                  <SelectItem value="down">Round Down</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxDisplay">Price Display</Label>
              <Select defaultValue="excluding">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excluding">Excluding Tax</SelectItem>
                  <SelectItem value="including">Including Tax</SelectItem>
                  <SelectItem value="both">Both Prices</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            Tax Rates
          </CardTitle>
          <CardDescription>Manage tax rates for different product categories.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {taxRates.map((rate) => (
            <div key={rate.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <Switch checked={rate.enabled} onCheckedChange={() => toggleTaxRate(rate.id)} />
                <div>
                  <h4 className="font-medium">{rate.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {rate.rate}% - {rate.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{rate.rate}%</span>
                <Button variant="ghost" size="icon" onClick={() => removeTaxRate(rate.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Tax Rate
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tax Exemptions</CardTitle>
          <CardDescription>Configure tax exemptions and special cases.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Senior Citizen Discount</Label>
              <p className="text-sm text-muted-foreground">Apply tax exemption for senior citizens</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Non-Profit Organizations</Label>
              <p className="text-sm text-muted-foreground">Tax exemption for registered non-profits</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Reseller Exemption</Label>
              <p className="text-sm text-muted-foreground">Tax exemption for registered resellers</p>
            </div>
            <Switch />
          </div>

          <div className="space-y-2">
            <Label htmlFor="exemptionThreshold">Exemption Threshold Amount</Label>
            <Input id="exemptionThreshold" type="number" placeholder="0.00" defaultValue="0.00" />
            <p className="text-sm text-muted-foreground">Minimum purchase amount for exemption eligibility</p>
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
