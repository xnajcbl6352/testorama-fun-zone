import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3 } from "lucide-react";
import { MarketingDashboard } from "./MarketingDashboard";
import { CampaignsList } from "./CampaignsList";
import { MarketingFeatures } from "./MarketingFeatures";

export function MarketingManagement() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="dashboard" className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Marketing Hub</h2>
          </div>
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard">
          <MarketingDashboard />
        </TabsContent>

        <TabsContent value="campaigns">
          <CampaignsList />
        </TabsContent>

        <TabsContent value="pricing">
          <MarketingFeatures />
        </TabsContent>

        <TabsContent value="leads">
          <MarketingFeatures />
        </TabsContent>
      </Tabs>
    </div>
  );
}