import { Card } from "@/components/ui/card";
import { Users, Target, CreditCard, Heart, BarChart2, LineChart } from "lucide-react";
import { AnalyticsCard } from "./AnalyticsCard";

export function MarketingDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard 
          icon={Users} 
          title="Total Leads" 
          value="2,543" 
          trend={12.5} 
        />
        <AnalyticsCard 
          icon={Target} 
          title="Conversion Rate" 
          value="3.2%" 
          trend={-2.4} 
        />
        <AnalyticsCard 
          icon={CreditCard} 
          title="Avg. Deal Size" 
          value="€850" 
          trend={5.1} 
        />
        <AnalyticsCard 
          icon={Heart} 
          title="Customer Satisfaction" 
          value="4.8/5" 
          trend={0.8} 
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">ROI Analytics</h3>
            <BarChart2 className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            Chart coming soon
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Lead Sources</h3>
            <LineChart className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            Chart coming soon
          </div>
        </Card>
      </div>
    </div>
  );
}