"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X, Save } from "lucide-react"

// Mock data
const roles = [
  { id: 1, name: "Administrator", color: "bg-purple-100 text-purple-800" },
  { id: 2, name: "Manager", color: "bg-blue-100 text-blue-800" },
  { id: 3, name: "Cashier", color: "bg-green-100 text-green-800" },
  { id: 4, name: "Inventory Specialist", color: "bg-orange-100 text-orange-800" },
]

const permissions = [
  {
    module: "Sales",
    actions: [
      { key: "sales_view", name: "View Sales", description: "View sales transactions and history" },
      { key: "sales_create", name: "Create Sales", description: "Process new sales transactions" },
      { key: "sales_edit", name: "Edit Sales", description: "Modify existing sales transactions" },
      { key: "sales_delete", name: "Delete Sales", description: "Remove sales transactions" },
    ],
  },
  {
    module: "Inventory",
    actions: [
      { key: "inventory_view", name: "View Inventory", description: "View product inventory levels" },
      { key: "inventory_create", name: "Add Products", description: "Add new products to inventory" },
      { key: "inventory_edit", name: "Edit Products", description: "Modify product information" },
      { key: "inventory_delete", name: "Delete Products", description: "Remove products from inventory" },
    ],
  },
  {
    module: "Customers",
    actions: [
      { key: "customers_view", name: "View Customers", description: "View customer information" },
      { key: "customers_create", name: "Add Customers", description: "Add new customer records" },
      { key: "customers_edit", name: "Edit Customers", description: "Modify customer information" },
      { key: "customers_delete", name: "Delete Customers", description: "Remove customer records" },
    ],
  },
  {
    module: "Suppliers",
    actions: [
      { key: "suppliers_view", name: "View Suppliers", description: "View supplier information" },
      { key: "suppliers_create", name: "Add Suppliers", description: "Add new supplier records" },
      { key: "suppliers_edit", name: "Edit Suppliers", description: "Modify supplier information" },
      { key: "suppliers_delete", name: "Delete Suppliers", description: "Remove supplier records" },
    ],
  },
  {
    module: "Reports",
    actions: [
      { key: "reports_view", name: "View Reports", description: "Access reporting dashboard" },
      { key: "reports_export", name: "Export Reports", description: "Export reports to various formats" },
    ],
  },
  {
    module: "Users",
    actions: [
      { key: "users_view", name: "View Users", description: "View user accounts and profiles" },
      { key: "users_create", name: "Add Users", description: "Create new user accounts" },
      { key: "users_edit", name: "Edit Users", description: "Modify user accounts and permissions" },
      { key: "users_delete", name: "Delete Users", description: "Remove user accounts" },
    ],
  },
  {
    module: "Settings",
    actions: [
      { key: "settings_view", name: "View Settings", description: "View system configuration" },
      { key: "settings_edit", name: "Edit Settings", description: "Modify system settings" },
    ],
  },
]

// Mock permission matrix data
const initialPermissions: Record<string, Record<string, boolean>> = {
  "1": {
    // Administrator
    sales_view: true,
    sales_create: true,
    sales_edit: true,
    sales_delete: true,
    inventory_view: true,
    inventory_create: true,
    inventory_edit: true,
    inventory_delete: true,
    customers_view: true,
    customers_create: true,
    customers_edit: true,
    customers_delete: true,
    suppliers_view: true,
    suppliers_create: true,
    suppliers_edit: true,
    suppliers_delete: true,
    reports_view: true,
    reports_export: true,
    users_view: true,
    users_create: true,
    users_edit: true,
    users_delete: true,
    settings_view: true,
    settings_edit: true,
  },
  "2": {
    // Manager
    sales_view: true,
    sales_create: true,
    sales_edit: true,
    sales_delete: false,
    inventory_view: true,
    inventory_create: true,
    inventory_edit: true,
    inventory_delete: false,
    customers_view: true,
    customers_create: true,
    customers_edit: true,
    customers_delete: false,
    suppliers_view: true,
    suppliers_create: true,
    suppliers_edit: true,
    suppliers_delete: false,
    reports_view: true,
    reports_export: true,
    users_view: true,
    users_create: false,
    users_edit: false,
    users_delete: false,
    settings_view: true,
    settings_edit: false,
  },
  "3": {
    // Cashier
    sales_view: true,
    sales_create: true,
    sales_edit: false,
    sales_delete: false,
    inventory_view: true,
    inventory_create: false,
    inventory_edit: false,
    inventory_delete: false,
    customers_view: true,
    customers_create: true,
    customers_edit: true,
    customers_delete: false,
    suppliers_view: false,
    suppliers_create: false,
    suppliers_edit: false,
    suppliers_delete: false,
    reports_view: false,
    reports_export: false,
    users_view: false,
    users_create: false,
    users_edit: false,
    users_delete: false,
    settings_view: false,
    settings_edit: false,
  },
  "4": {
    // Inventory Specialist
    sales_view: true,
    sales_create: false,
    sales_edit: false,
    sales_delete: false,
    inventory_view: true,
    inventory_create: true,
    inventory_edit: true,
    inventory_delete: true,
    customers_view: false,
    customers_create: false,
    customers_edit: false,
    customers_delete: false,
    suppliers_view: true,
    suppliers_create: true,
    suppliers_edit: true,
    suppliers_delete: false,
    reports_view: true,
    reports_export: false,
    users_view: false,
    users_create: false,
    users_edit: false,
    users_delete: false,
    settings_view: false,
    settings_edit: false,
  },
}

export function PermissionMatrix() {
  const [permissionMatrix, setPermissionMatrix] = useState(initialPermissions)
  const [hasChanges, setHasChanges] = useState(false)

  const togglePermission = (roleId: string, permissionKey: string) => {
    setPermissionMatrix((prev) => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        [permissionKey]: !prev[roleId][permissionKey],
      },
    }))
    setHasChanges(true)
  }

  const saveChanges = () => {
    console.log("Saving permission changes:", permissionMatrix)
    setHasChanges(false)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Permission Matrix</h3>
          <p className="text-sm text-muted-foreground">Manage permissions across all roles in a comprehensive view</p>
        </div>
        {hasChanges && (
          <Button onClick={saveChanges}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        )}
      </div>

      {/* Permission Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions Overview</CardTitle>
          <CardDescription>Toggle permissions for each role across different system modules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Permission</th>
                  {roles.map((role) => (
                    <th key={role.id} className="text-center p-4 min-w-[120px]">
                      <Badge className={role.color}>{role.name}</Badge>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {permissions.map((module) => (
                  <>
                    <tr key={module.module} className="border-b bg-muted/50">
                      <td colSpan={roles.length + 1} className="p-4 font-semibold text-sm">
                        {module.module}
                      </td>
                    </tr>
                    {module.actions.map((action) => (
                      <tr key={action.key} className="border-b hover:bg-muted/30">
                        <td className="p-4">
                          <div>
                            <div className="font-medium text-sm">{action.name}</div>
                            <div className="text-xs text-muted-foreground">{action.description}</div>
                          </div>
                        </td>
                        {roles.map((role) => (
                          <td key={role.id} className="p-4 text-center">
                            <div className="flex items-center justify-center">
                              {permissionMatrix[role.id.toString()]?.[action.key] ? (
                                <div
                                  className="cursor-pointer p-1 rounded hover:bg-green-100"
                                  onClick={() => togglePermission(role.id.toString(), action.key)}
                                >
                                  <Check className="h-5 w-5 text-green-600" />
                                </div>
                              ) : (
                                <div
                                  className="cursor-pointer p-1 rounded hover:bg-red-100"
                                  onClick={() => togglePermission(role.id.toString(), action.key)}
                                >
                                  <X className="h-5 w-5 text-red-400" />
                                </div>
                              )}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Permission Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {roles.map((role) => {
          const rolePermissions = permissionMatrix[role.id.toString()] || {}
          const totalPermissions = Object.keys(rolePermissions).length
          const grantedPermissions = Object.values(rolePermissions).filter(Boolean).length
          const permissionPercentage =
            totalPermissions > 0 ? Math.round((grantedPermissions / totalPermissions) * 100) : 0

          return (
            <Card key={role.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge className={role.color}>{role.name}</Badge>
                  <span className="text-2xl font-bold">{permissionPercentage}%</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Granted:</span>
                    <span className="font-medium">{grantedPermissions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total:</span>
                    <span className="font-medium">{totalPermissions}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${permissionPercentage}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
