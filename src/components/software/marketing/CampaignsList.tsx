import { useEffect, useState } from "react";
import { CampaignCard } from "./CampaignCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Campaign } from "@/types/campaign";

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
      const transformedCampaigns: Campaign[] = (data || []).map(campaign => ({
        id: campaign.id,
        name: campaign.name,
        type: campaign.type,
        status: campaign.status,
        start_date: campaign.start_date,
        end_date: campaign.end_date,
        metrics: typeof campaign.metrics === 'object' ? {
          reach: campaign.metrics?.reach as number || 0,
          conversions: campaign.metrics?.conversions as number || 0,
          roi: campaign.metrics?.roi as string || '0%',
        } : {
          reach: 0,
          conversions: 0,
          roi: '0%'
        }
      }));

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