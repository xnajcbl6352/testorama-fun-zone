import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Percent, BarChart2, MessageSquare, Mail, Globe } from "lucide-react";

export function MarketingFeatures() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="p-6">
        <Package className="h-8 w-8 text-primary mb-4" />
        <h3 className="text-lg font-semibold mb-2">Package Configuration</h3>
        <p className="text-sm text-gray-600 mb-4">Manage your service packages and pricing tiers</p>
        <Button variant="outline" className="w-full">Manage Packages</Button>
      </Card>
      
      <Card className="p-6">
        <Percent className="h-8 w-8 text-primary mb-4" />
        <h3 className="text-lg font-semibold mb-2">Promotions</h3>
        <p className="text-sm text-gray-600 mb-4">Create and manage promotional campaigns</p>
        <Button variant="outline" className="w-full">View Promotions</Button>
      </Card>

      <Card className="p-6">
        <BarChart2 className="h-8 w-8 text-primary mb-4" />
        <h3 className="text-lg font-semibold mb-2">Pricing Analytics</h3>
        <p className="text-sm text-gray-600 mb-4">Analyze pricing performance and trends</p>
        <Button variant="outline" className="w-full">View Analytics</Button>
      </Card>

      <Card className="p-6">
        <MessageSquare className="h-8 w-8 text-primary mb-4" />
        <h3 className="text-lg font-semibold mb-2">Lead Nurturing</h3>
        <p className="text-sm text-gray-600 mb-4">Manage lead communication and follow-ups</p>
        <Button variant="outline" className="w-full">View Leads</Button>
      </Card>
      
      <Card className="p-6">
        <Mail className="h-8 w-8 text-primary mb-4" />
        <h3 className="text-lg font-semibold mb-2">Email Campaigns</h3>
        <p className="text-sm text-gray-600 mb-4">Create and manage email marketing campaigns</p>
        <Button variant="outline" className="w-full">Manage Campaigns</Button>
      </Card>

      <Card className="p-6">
        <Globe className="h-8 w-8 text-primary mb-4" />
        <h3 className="text-lg font-semibold mb-2">Website Integration</h3>
        <p className="text-sm text-gray-600 mb-4">Configure website forms and tracking</p>
        <Button variant="outline" className="w-full">Configure</Button>
      </Card>
    </div>
  );
}