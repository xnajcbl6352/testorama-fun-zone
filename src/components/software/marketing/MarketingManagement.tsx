import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users2, Target, Share2, Gift, LineChart } from "lucide-react";
import { MarketingDashboard } from "./MarketingDashboard";
import { LeadManagement } from "./LeadManagement";
import { CampaignsList } from "./CampaignsList";
import { SocialMediaHub } from "./SocialMediaHub";
import { ReferralProgram } from "./ReferralProgram";
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
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <Users2 className="h-4 w-4" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Social Media
            </TabsTrigger>
            <TabsTrigger value="referrals" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Referrals
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard">
          <MarketingDashboard />
        </TabsContent>

        <TabsContent value="leads">
          <LeadManagement />
        </TabsContent>

        <TabsContent value="campaigns">
          <CampaignsList />
        </TabsContent>

        <TabsContent value="social">
          <SocialMediaHub />
        </TabsContent>

        <TabsContent value="referrals">
          <ReferralProgram />
        </TabsContent>
      </Tabs>
    </div>
  );
}