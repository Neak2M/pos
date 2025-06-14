"use client"

import { useState } from "react"
import { Download, Mail, Printer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ReportExportProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  activeTab: string
  dateRange: { from: Date; to: Date }
  period: string
}

export function ReportExport({ open, onOpenChange, activeTab, dateRange, period }: ReportExportProps) {
  const [exportFormat, setExportFormat] = useState("pdf")
  const [exportType, setExportType] = useState("download")
  const [selectedSections, setSelectedSections] = useState({
    summary: true,
    charts: true,
    tables: true,
    details: false,
  })
  const [emailAddress, setEmailAddress] = useState("")

  const handleExport = () => {
    // In a real app, you would generate and export the report here
    console.log("Exporting report:", {
      activeTab,
      dateRange,
      period,
      exportFormat,
      exportType,
      selectedSections,
      emailAddress: exportType === "email" ? emailAddress : undefined,
    })
    onOpenChange(false)
  }

  const getSectionOptions = () => {
    switch (activeTab) {
      case "sales":
        return [
          { id: "summary", label: "Sales Summary", description: "Key metrics and totals" },
          { id: "charts", label: "Sales Charts", description: "Trend and performance charts" },
          { id: "tables", label: "Data Tables", description: "Detailed sales data" },
          { id: "details", label: "Transaction Details", description: "Individual transaction records" },
        ]
      case "inventory":
        return [
          { id: "summary", label: "Inventory Overview", description: "Stock levels and valuation" },
          { id: "charts", label: "Inventory Charts", description: "Stock movement and trends" },
          { id: "tables", label: "Stock Tables", description: "Detailed inventory data" },
          { id: "details", label: "Movement History", description: "All stock movements" },
        ]
      case "tax":
        return [
          { id: "summary", label: "Tax Summary", description: "Tax collection overview" },
          { id: "charts", label: "Tax Charts", description: "Tax breakdown and trends" },
          { id: "tables", label: "Tax Tables", description: "Detailed tax data" },
          { id: "details", label: "Compliance Details", description: "Filing requirements and status" },
        ]
      default:
        return []
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Export Reports</DialogTitle>
          <DialogDescription>
            Export {activeTab} reports for the selected date range ({dateRange.from.toLocaleDateString()} -{" "}
            {dateRange.to.toLocaleDateString()})
          </DialogDescription>
        </DialogHeader>

        <Tabs value={exportType} onValueChange={setExportType}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="download">Download</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="print">Print</TabsTrigger>
          </TabsList>

          <TabsContent value="download" className="space-y-4">
            <div className="space-y-2">
              <Label>Export Format</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv">CSV Data</SelectItem>
                  <SelectItem value="json">JSON Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Email Format</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Attachment</SelectItem>
                  <SelectItem value="excel">Excel Attachment</SelectItem>
                  <SelectItem value="html">HTML Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="print" className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <div className="flex items-center gap-2">
                <Printer className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Print Report</p>
                  <p className="text-sm text-muted-foreground">
                    The report will be formatted for printing and sent to your default printer.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Separator />

        <div className="space-y-4">
          <Label>Include Sections</Label>
          <div className="space-y-3">
            {getSectionOptions().map((section) => (
              <div key={section.id} className="flex items-start space-x-3">
                <Checkbox
                  id={section.id}
                  checked={selectedSections[section.id as keyof typeof selectedSections]}
                  onCheckedChange={(checked) =>
                    setSelectedSections((prev) => ({
                      ...prev,
                      [section.id]: checked,
                    }))
                  }
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor={section.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {section.label}
                  </Label>
                  <p className="text-xs text-muted-foreground">{section.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={exportType === "email" && !emailAddress}>
            {exportType === "download" && <Download className="mr-2 h-4 w-4" />}
            {exportType === "email" && <Mail className="mr-2 h-4 w-4" />}
            {exportType === "print" && <Printer className="mr-2 h-4 w-4" />}
            {exportType === "download" && "Download Report"}
            {exportType === "email" && "Send Email"}
            {exportType === "print" && "Print Report"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
