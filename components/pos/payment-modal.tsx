"use client"

import { useState } from "react"
import { Check, CreditCard, DollarSign, QrCode, Smartphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  total: number
  cart: Array<{ product: any; quantity: number }>
}

export function PaymentModal({ open, onOpenChange, total, cart }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [amountPaid, setAmountPaid] = useState(total.toFixed(2))
  const [paymentComplete, setPaymentComplete] = useState(false)

  const handlePayment = () => {
    // In a real app, you would process the payment here
    setPaymentComplete(true)
  }

  const handleClose = () => {
    setPaymentComplete(false)
    onOpenChange(false)
  }

  const change = Number.parseFloat(amountPaid) - total

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        {!paymentComplete ? (
          <>
            <DialogHeader>
              <DialogTitle>Payment</DialogTitle>
              <DialogDescription>Complete the transaction by selecting a payment method.</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="cash" value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="cash">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Cash
                </TabsTrigger>
                <TabsTrigger value="card">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Card
                </TabsTrigger>
                <TabsTrigger value="mobile">
                  <Smartphone className="mr-2 h-4 w-4" />
                  Mobile
                </TabsTrigger>
                <TabsTrigger value="qr">
                  <QrCode className="mr-2 h-4 w-4" />
                  QR Code
                </TabsTrigger>
              </TabsList>
              <TabsContent value="cash" className="space-y-4 pt-4">
                <div className="grid gap-4">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">
                      Amount Due
                    </Label>
                    <Input id="amount" value={`$${total.toFixed(2)}`} className="col-span-2" disabled />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="paid" className="text-right">
                      Amount Paid
                    </Label>
                    <Input
                      id="paid"
                      value={amountPaid}
                      onChange={(e) => setAmountPaid(e.target.value)}
                      className="col-span-2"
                      type="number"
                      step="0.01"
                      min={total}
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="change" className="text-right">
                      Change
                    </Label>
                    <Input
                      id="change"
                      value={`$${change > 0 ? change.toFixed(2) : "0.00"}`}
                      className="col-span-2"
                      disabled
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="card" className="space-y-4 pt-4">
                <div className="rounded-md bg-muted p-4 text-center">
                  <CreditCard className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm font-medium">Ready to process card payment</p>
                  <p className="text-sm text-muted-foreground">Please swipe or insert customer card</p>
                </div>
              </TabsContent>
              <TabsContent value="mobile" className="space-y-4 pt-4">
                <div className="rounded-md bg-muted p-4 text-center">
                  <Smartphone className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm font-medium">Mobile payment ready</p>
                  <p className="text-sm text-muted-foreground">Customer can tap their phone to pay</p>
                </div>
              </TabsContent>
              <TabsContent value="qr" className="space-y-4 pt-4">
                <div className="rounded-md bg-muted p-4 text-center">
                  <div className="mx-auto h-32 w-32 bg-white p-2">
                    <div className="h-full w-full bg-[url('/placeholder.svg')] bg-contain bg-center bg-no-repeat" />
                  </div>
                  <p className="mt-2 text-sm font-medium">Scan QR code to pay</p>
                  <p className="text-sm text-muted-foreground">Customer can scan this code with their phone</p>
                </div>
              </TabsContent>
            </Tabs>
            <Separator />
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span>Subtotal ({cart.length} items)</span>
                <span>${(total - total * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Tax (8%)</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handlePayment}>Complete Payment</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="mt-4 text-xl font-semibold">Payment Successful</h2>
              <p className="mt-2 text-muted-foreground">Transaction has been completed successfully.</p>
              <div className="mt-6 w-full rounded-md border p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Transaction ID</span>
                    <span className="font-medium">{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Payment Method</span>
                    <span className="font-medium capitalize">{paymentMethod}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Amount Paid</span>
                    <span className="font-medium">${amountPaid}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Change</span>
                    <span className="font-medium">${change > 0 ? change.toFixed(2) : "0.00"}</span>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Print Receipt</Button>
              <Button onClick={handleClose}>New Sale</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
