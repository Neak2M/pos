"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, Minus, Plus, Search, Trash, User, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { CustomerSelector } from "@/components/pos/customer-selector"
import { PaymentModal } from "@/components/pos/payment-modal"

// Sample product data
const products = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 129.99,
    category: "Electronics",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    category: "Electronics",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 89.99,
    category: "Electronics",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Laptop Sleeve",
    price: 29.99,
    category: "Accessories",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Wireless Charger",
    price: 49.99,
    category: "Electronics",
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Fitness Tracker",
    price: 79.99,
    category: "Electronics",
    image: "/placeholder.svg",
  },
  {
    id: 7,
    name: "Desk Lamp",
    price: 39.99,
    category: "Home",
    image: "/placeholder.svg",
  },
  {
    id: 8,
    name: "Portable Power Bank",
    price: 59.99,
    category: "Electronics",
    image: "/placeholder.svg",
  },
  {
    id: 9,
    name: "Wireless Mouse",
    price: 24.99,
    category: "Accessories",
    image: "/placeholder.svg",
  },
  {
    id: 10,
    name: "USB-C Cable",
    price: 14.99,
    category: "Accessories",
    image: "/placeholder.svg",
  },
  {
    id: 11,
    name: "Keyboard",
    price: 49.99,
    category: "Accessories",
    image: "/placeholder.svg",
  },
  {
    id: 12,
    name: "Monitor Stand",
    price: 34.99,
    category: "Accessories",
    image: "/placeholder.svg",
  },
]

// Product categories
const categories = ["All", "Electronics", "Accessories", "Home", "Office", "Clothing", "Food & Beverage"]

export default function POSPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [cart, setCart] = useState<Array<{ product: any; quantity: number }>>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)

  // Filter products by category and search query
  const filteredProducts = products.filter(
    (product) =>
      (activeCategory === "All" || product.category === activeCategory) &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Add product to cart
  const addToCart = (product: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...prevCart, { product, quantity: 1 }]
    })
  }

  // Update product quantity in cart
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.product.id === productId ? { ...item, quantity: newQuantity } : item)),
    )
  }

  // Remove product from cart
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId))
  }

  // Calculate cart totals
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + tax

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col md:flex-row">
      {/* Product selection area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="border-b p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <CustomerSelector selectedCustomer={selectedCustomer} onSelectCustomer={setSelectedCustomer} />
          </div>
          <ScrollArea className="mt-4 whitespace-nowrap pb-2">
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden transition-all hover:shadow-md"
                onClick={() => addToCart(product)}
              >
                <div className="aspect-square relative">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <CardContent className="p-3">
                  <div className="space-y-1">
                    <h3 className="font-medium line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Cart area */}
      <div className="flex w-full flex-col border-l md:w-[400px]">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-medium">Current Sale</h2>
          {selectedCustomer && (
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4" />
              <span>{selectedCustomer}</span>
            </div>
          )}
        </div>
        <ScrollArea className="flex-1 p-4">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
              <ShoppingCart className="mb-2 h-10 w-10" />
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-sm">Add products to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-md">
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center rounded-md border">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        <div className="border-t p-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex items-center justify-between font-medium">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-2">
            <Button variant="outline" disabled={cart.length === 0}>
              Hold Sale
            </Button>
            <Button disabled={cart.length === 0} onClick={() => setIsPaymentModalOpen(true)}>
              Payment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen} total={total} cart={cart} />
    </div>
  )
}
