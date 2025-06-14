"use client"

import { useState } from "react"
import Image from "next/image"
import { Edit, MoreHorizontal, Package, Plus, Search, Trash } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample supplied products data
const suppliedProductsData = [
  {
    id: 1,
    supplierId: 1,
    name: "Wireless Earbuds",
    sku: "WE001",
    category: "Electronics",
    unitCost: 65.0,
    currentStock: 45,
    minOrderQty: 10,
    lastOrdered: "2024-01-20",
    status: "active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    supplierId: 1,
    name: "Smart Watch",
    sku: "SW002",
    category: "Electronics",
    unitCost: 120.0,
    currentStock: 23,
    minOrderQty: 5,
    lastOrdered: "2023-12-15",
    status: "active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    supplierId: 1,
    name: "Fitness Tracker",
    sku: "FT006",
    category: "Electronics",
    unitCost: 55.0,
    currentStock: 18,
    minOrderQty: 8,
    lastOrdered: "2023-11-10",
    status: "active",
    image: "/placeholder.svg?height=40&width=40",
  },
]

interface SuppliedProductsProps {
  supplierId: number
}

export function SuppliedProducts({ supplierId }: SuppliedProductsProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>
      case "discontinued":
        return <Badge variant="secondary">Discontinued</Badge>
      case "out_of_stock":
        return <Badge variant="destructive">Out of Stock</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Filter products by supplier ID and search query
  const filteredProducts = suppliedProductsData
    .filter((product) => product.supplierId === supplierId)
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesSearch
    })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Image</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Unit Cost</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Min Order</TableHead>
              <TableHead>Last Ordered</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="h-10 w-10 overflow-hidden rounded-md">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.unitCost.toFixed(2)}</TableCell>
                <TableCell>{product.currentStock}</TableCell>
                <TableCell>{product.minOrderQty}</TableCell>
                <TableCell>{new Date(product.lastOrdered).toLocaleDateString()}</TableCell>
                <TableCell>{getStatusBadge(product.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Package className="mr-2 h-4 w-4" />
                        Create order
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit product
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Remove from supplier
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
