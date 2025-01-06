import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, Search, Plus, Target, Users, TrendingUp, 
  Calendar, Package, Percent, MessageSquare, LineChart,
  Mail, Globe, CreditCard, Heart, BarChart2
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Fetch campaigns from Supabase
const useCampaigns = () => {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });
};

// Analytics Card Component
const AnalyticsCard = ({ icon: Icon, title, value, trend, className = "" }) => (
  <Card className={`p-6 ${className}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold mt-2">{value}</h3>
      </div>
      <Icon className="h-8 w-8 text-muted-foreground/50" />
    </div>
    {trend && (
      <p className="text-xs text-muted-foreground mt-2">
        {trend > 0 ? "+" : ""}{trend}% from last month
      </p>
    )}
  </Card>
);

// Campaign Card Component
const CampaignCard = ({ campaign }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "ended":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
            {campaign.status}
          </span>
          <h3 className="mt-2 text-lg font-semibold">{campaign.name}</h3>
          <p className="text-sm text-gray-600">{campaign.type}</p>
        </div>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{new Date(campaign.start_date).toLocaleDateString()} - {campaign.end_date ? new Date(campaign.end_date).toLocaleDateString() : 'Ongoing'}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 bg-gray-50 rounded-lg p-3">
        <div className="text-center">
          <Target className="h-4 w-4 mx-auto mb-1 text-gray-600" />
          <div className="text-sm font-medium">
            {campaign.metrics?.reach || 0}
          </div>
          <div className="text-xs text-gray-500">Reach</div>
        </div>
        <div className="text-center">
          <Users className="h-4 w-4 mx-auto mb-1 text-gray-600" />
          <div className="text-sm font-medium">
            {campaign.metrics?.conversions || 0}
          </div>
          <div className="text-xs text-gray-500">Conversions</div>
        </div>
        <div className="text-center">
          <TrendingUp className="h-4 w-4 mx-auto mb-1 text-gray-600" />
          <div className="text-sm font-medium">
            {campaign.metrics?.roi || '0%'}
          </div>
          <div className="text-xs text-gray-500">ROI</div>
        </div>
      </div>
    </Card>
  );
};

export function MarketingManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const { data: campaigns = [], isLoading } = useCampaigns();

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCampaign = () => {
    toast({
      title: "Feature in development",
      description: "The campaign creation feature will be available soon.",
    });
  };

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

        <TabsContent value="dashboard" className="space-y-6">
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
              <h3 className="text-lg font-semibold mb-4">Channel Performance</h3>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Chart coming soon
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Lead Sources</h3>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Chart coming soon
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                className="pl-10"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleAddCampaign} className="gap-2">
              <Plus className="h-4 w-4" />
              New Campaign
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <p>Loading campaigns...</p>
            ) : filteredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
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
          </div>
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}