"use client"

import { useState } from "react"
import { Minus, Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

// Sample products that can be ordered
const availableProducts = [
  { id: 1, name: "Wireless Earbuds", sku: "WE001", unitPrice: 65.0, supplierId: 1 },
  { id: 2, name: "Smart Watch", sku: "SW002", unitPrice: 120.0, supplierId: 1 },
  { id: 3, name: "Bluetooth Speaker", sku: "BS003", unitPrice: 45.0, supplierId: 2 },
  { id: 4, name: "Laptop Sleeve", sku: "LS004", unitPrice: 15.0, supplierId: 3 },
  { id: 5, name: "Wireless Charger", sku: "WC005", unitPrice: 25.0, supplierId: 4 },
  { id: 6, name: "Fitness Tracker", sku: "FT006", unitPrice: 55.0, supplierId: 1 },
  { id: 7, name: "Portable Speaker", sku: "PS007", unitPrice: 35.0, supplierId: 2 },
  { id: 8, name: "Phone Case", sku: "PC008", unitPrice: 12.0, supplierId: 3 },
]

interface CreatePurchaseOrderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  suppliers: Array<{
    id: number
    name: string
    contactPerson: string
    email: string
    paymentTerms: string
    leadTime: string
  }>
}

interface OrderItem {
  productId: number
  name: string
  sku: string
  unitPrice: number
  quantity: number
  total: number
}

export function CreatePurchaseOrderDialog({ open, onOpenChange, suppliers }: CreatePurchaseOrderDialogProps) {
  const [selectedSupplier, setSelectedSupplier] = useState<number | null>(null)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [priority, setPriority] = useState("medium")
  const [notes, setNotes] = useState("")
  const [productSearchOpen, setProductSearchOpen] = useState(false)

  const selectedSupplierData = suppliers.find((s) => s.id === selectedSupplier)
  const availableProductsForSupplier = availableProducts.filter((p) => p.supplierId === selectedSupplier)

  const addProduct = (product: any) => {
    const existingItem = orderItems.find((item) => item.productId === product.id)
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1)
    } else {
      const newItem: OrderItem = {
        productId: product.id,
        name: product.name,
        sku: product.sku,
        unitPrice: product.unitPrice,
        quantity: 1,
        total: product.unitPrice,
      }
      setOrderItems([...orderItems, newItem])
    }
    setProductSearchOpen(false)
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId)
      return
    }
    setOrderItems(
      orderItems.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity, total: item.unitPrice * newQuantity } : item,
      ),
    )
  }

  const removeItem = (productId: number) => {
    setOrderItems(orderItems.filter((item) => item.productId !== productId))
  }

  const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0)
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + tax

  const handleSubmit = () => {
    if (!selectedSupplier || orderItems.length === 0) return

    // In a real app, you would save the purchase order here
    console.log("Creating purchase order:", {
      supplierId: selectedSupplier,
      items: orderItems,
      priority,
      notes,
      subtotal,
      tax,
      total,
    })

    // Reset form
    setSelectedSupplier(null)
    setOrderItems([])
    setPriority("medium")
    setNotes("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create Purchase Order</DialogTitle>
          <DialogDescription>Create a new purchase order for inventory restocking.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Supplier Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Supplier</Label>
              <Select
                value={selectedSupplier?.toString()}
                onValueChange={(value) => setSelectedSupplier(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier..." />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id.toString()}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Supplier Info */}
          {selectedSupplierData && (
            <div className="rounded-md bg-muted p-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Contact:</span> {selectedSupplierData.contactPerson}
                </div>
                <div>
                  <span className="font-medium">Payment Terms:</span> {selectedSupplierData.paymentTerms}
                </div>
                <div>
                  <span className="font-medium">Lead Time:</span> {selectedSupplierData.leadTime}
                </div>
              </div>
            </div>
          )}

          {/* Product Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Order Items</Label>
              {selectedSupplier && (
                <Popover open={productSearchOpen} onOpenChange={setProductSearchOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Product
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0">
                    <Command>
                      <CommandInput placeholder="Search products..." />
                      <CommandList>
                        <CommandEmpty>No products found.</CommandEmpty>
                        <CommandGroup>
                          {availableProductsForSupplier.map((product) => (
                            <CommandItem key={product.id} onSelect={() => addProduct(product)}>
                              <div className="flex w-full items-center justify-between">
                                <div>
                                  <div className="font-medium">{product.name}</div>
                                  <div className="text-sm text-muted-foreground">{product.sku}</div>
                                </div>
                                <div className="text-sm font-medium">${product.unitPrice.toFixed(2)}</div>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
            </div>

            {orderItems.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderItems.map((item) => (
                      <TableRow key={item.productId}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.sku}</TableCell>
                        <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>${item.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeItem(item.productId)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="rounded-md border border-dashed p-8 text-center text-muted-foreground">
                {selectedSupplier
                  ? "No items added yet. Click 'Add Product' to get started."
                  : "Select a supplier first."}
              </div>
            )}
          </div>

          {/* Order Summary */}
          {orderItems.length > 0 && (
            <div className="space-y-4">
              <Separator />
              <div className="flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any special instructions or notes for this order..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedSupplier || orderItems.length === 0}>
            Create Purchase Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
