import { AlertCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function LowStockAlert() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          <div className="font-medium">Wireless Earbuds</div>
        </div>
        <Badge variant="outline" className="ml-auto">
          5 left
        </Badge>
        <Button size="sm" variant="outline">
          Restock
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          <div className="font-medium">Smart Watch</div>
        </div>
        <Badge variant="outline" className="ml-auto">
          3 left
        </Badge>
        <Button size="sm" variant="outline">
          Restock
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <div className="font-medium">Bluetooth Speaker</div>
        </div>
        <Badge variant="outline" className="ml-auto">
          1 left
        </Badge>
        <Button size="sm" variant="outline">
          Restock
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          <div className="font-medium">Laptop Charger</div>
        </div>
        <Badge variant="outline" className="ml-auto">
          4 left
        </Badge>
        <Button size="sm" variant="outline">
          Restock
        </Button>
      </div>
    </div>
  )
}
