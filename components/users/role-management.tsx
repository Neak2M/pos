"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Shield, Users, Trash2, Edit } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Mock data
const roles = [
  {
    id: 1,
    name: "Administrator",
    description: "Full system access with all permissions",
    userCount: 2,
    isSystem: true,
    permissions: {
      sales: { view: true, create: true, edit: true, delete: true },
      inventory: { view: true, create: true, edit: true, delete: true },
      customers: { view: true, create: true, edit: true, delete: true },
      suppliers: { view: true, create: true, edit: true, delete: true },
      reports: { view: true, export: true },
      users: { view: true, create: true, edit: true, delete: true },
      settings: { view: true, edit: true },
    },
  },
  {
    id: 2,
    name: "Manager",
    description: "Management level access with reporting capabilities",
    userCount: 3,
    isSystem: true,
    permissions: {
      sales: { view: true, create: true, edit: true, delete: false },
      inventory: { view: true, create: true, edit: true, delete: false },
      customers: { view: true, create: true, edit: true, delete: false },
      suppliers: { view: true, create: true, edit: true, delete: false },
      reports: { view: true, export: true },
      users: { view: true, create: false, edit: false, delete: false },
      settings: { view: true, edit: false },
    },
  },
  {
    id: 3,
    name: "Cashier",
    description: "Point of sale operations and customer management",
    userCount: 8,
    isSystem: true,
    permissions: {
      sales: { view: true, create: true, edit: false, delete: false },
      inventory: { view: true, create: false, edit: false, delete: false },
      customers: { view: true, create: true, edit: true, delete: false },
      suppliers: { view: false, create: false, edit: false, delete: false },
      reports: { view: false, export: false },
      users: { view: false, create: false, edit: false, delete: false },
      settings: { view: false, edit: false },
    },
  },
  {
    id: 4,
    name: "Inventory Specialist",
    description: "Inventory management and supplier coordination",
    userCount: 2,
    isSystem: true,
    permissions: {
      sales: { view: true, create: false, edit: false, delete: false },
      inventory: { view: true, create: true, edit: true, delete: true },
      customers: { view: false, create: false, edit: false, delete: false },
      suppliers: { view: true, create: true, edit: true, delete: false },
      reports: { view: true, export: false },
      users: { view: false, create: false, edit: false, delete: false },
      settings: { view: false, edit: false },
    },
  },
]

export function RoleManagement() {
  const [selectedRole, setSelectedRole] = useState<(typeof roles)[0] | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: {
      sales: { view: false, create: false, edit: false, delete: false },
      inventory: { view: false, create: false, edit: false, delete: false },
      customers: { view: false, create: false, edit: false, delete: false },
      suppliers: { view: false, create: false, edit: false, delete: false },
      reports: { view: false, export: false },
      users: { view: false, create: false, edit: false, delete: false },
      settings: { view: false, edit: false },
    },
  })

  const handleCreateRole = () => {
    console.log("Creating role:", newRole)
    setShowCreateDialog(false)
    setNewRole({
      name: "",
      description: "",
      permissions: {
        sales: { view: false, create: false, edit: false, delete: false },
        inventory: { view: false, create: false, edit: false, delete: false },
        customers: { view: false, create: false, edit: false, delete: false },
        suppliers: { view: false, create: false, edit: false, delete: false },
        reports: { view: false, export: false },
        users: { view: false, create: false, edit: false, delete: false },
        settings: { view: false, edit: false },
      },
    })
  }

  const updatePermission = (module: string, action: string, value: boolean) => {
    setNewRole((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: {
          ...prev.permissions[module as keyof typeof prev.permissions],
          [action]: value,
        },
      },
    }))
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Role Management</h3>
          <p className="text-sm text-muted-foreground">Define roles and assign permissions to control system access</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription>Define a new role with specific permissions for your team members.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role-name">Role Name</Label>
                  <Input
                    id="role-name"
                    value={newRole.name}
                    onChange={(e) => setNewRole((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter role name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role-description">Description</Label>
                  <Textarea
                    id="role-description"
                    value={newRole.description}
                    onChange={(e) => setNewRole((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe this role's responsibilities"
                  />
                </div>
              </div>

              {/* Permissions */}
              <div className="space-y-4">
                <h4 className="font-medium">Permissions</h4>
                {Object.entries(newRole.permissions).map(([module, perms]) => (
                  <Card key={module}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base capitalize">{module}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(perms).map(([action, enabled]) => (
                          <div key={action} className="flex items-center space-x-2">
                            <Switch
                              id={`${module}-${action}`}
                              checked={enabled}
                              onCheckedChange={(checked) => updatePermission(module, action, checked)}
                            />
                            <Label htmlFor={`${module}-${action}`} className="capitalize">
                              {action}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateRole}>Create Role</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Roles Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">{role.name}</CardTitle>
                  {role.isSystem && <Badge variant="secondary">System</Badge>}
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  {!role.isSystem && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Role</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this role? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
              <CardDescription>{role.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    Users assigned
                  </span>
                  <Badge variant="outline">{role.userCount}</Badge>
                </div>

                {/* Permission Summary */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">Permissions:</div>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(role.permissions).map(([module, perms]) => {
                      const hasAnyPermission = Object.values(perms).some(Boolean)
                      if (!hasAnyPermission) return null

                      return (
                        <Badge key={module} variant="secondary" className="text-xs">
                          {module}
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
