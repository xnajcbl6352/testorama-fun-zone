import { useEffect, useState } from "react";
import { CampaignCard } from "./CampaignCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Campaign } from "@/types/campaign";
import { Json } from "@/integrations/supabase/types";

export function CampaignsList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*');

      if (error) throw error;

      // Transform the data to match the Campaign interface
      const transformedCampaigns: Campaign[] = (data || []).map(campaign => {
        const metrics = campaign.metrics as { [key: string]: Json };
        
        return {
          id: campaign.id,
          name: campaign.name,
          type: campaign.type,
          status: campaign.status,
          start_date: campaign.start_date,
          end_date: campaign.end_date,
          metrics: {
            reach: typeof metrics?.reach === 'number' ? metrics.reach : 0,
            conversions: typeof metrics?.conversions === 'number' ? metrics.conversions : 0,
            roi: typeof metrics?.roi === 'string' ? metrics.roi : '0%',
          }
        };
      });

      setCampaigns(transformedCampaigns);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {campaigns.map((campaign) => (
        <CampaignCard
          key={campaign.id}
          campaign={campaign}
        />
      ))}
    </div>
  );
}