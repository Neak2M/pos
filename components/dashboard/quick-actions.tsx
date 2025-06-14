import { BarChart3, FileText, Package, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button variant="outline" className="h-auto flex-col gap-2 py-4">
        <ShoppingCart className="h-5 w-5" />
        <span>New Sale</span>
      </Button>
      <Button variant="outline" className="h-auto flex-col gap-2 py-4">
        <Package className="h-5 w-5" />
        <span>Add Product</span>
      </Button>
      <Button variant="outline" className="h-auto flex-col gap-2 py-4">
        <FileText className="h-5 w-5" />
        <span>Create Invoice</span>
      </Button>
      <Button variant="outline" className="h-auto flex-col gap-2 py-4">
        <BarChart3 className="h-5 w-5" />
        <span>View Reports</span>
      </Button>
    </div>
  )
}
