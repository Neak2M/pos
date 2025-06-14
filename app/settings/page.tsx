"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BusinessProfile } from "@/components/settings/business-profile"
import { PaymentSettings } from "@/components/settings/payment-settings"
import { TaxConfiguration } from "@/components/settings/tax-configuration"
import { SystemPreferences } from "@/components/settings/system-preferences"

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <Tabs defaultValue="business" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="business">Business Profile</TabsTrigger>
          <TabsTrigger value="payment">Payment Settings</TabsTrigger>
          <TabsTrigger value="tax">Tax Configuration</TabsTrigger>
          <TabsTrigger value="system">System Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="business" className="space-y-4">
          <BusinessProfile />
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <PaymentSettings />
        </TabsContent>

        <TabsContent value="tax" className="space-y-4">
          <TaxConfiguration />
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <SystemPreferences />
        </TabsContent>
      </Tabs>
    </div>
  )
}
