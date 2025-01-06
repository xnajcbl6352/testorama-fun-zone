import { Json } from "@/integrations/supabase/types";

export interface Campaign {
  id: string;
  name: string;
  type: string;
  status?: string;
  start_date: string;
  end_date?: string;
  budget?: number;
  target_audience?: Json;
  metrics?: {
    reach?: number;
    conversions?: number;
    roi?: string;
  };
  ab_test_config?: Json;
  created_at?: string;
  updated_at?: string;
}

export interface CampaignCardProps {
  campaign: Campaign;
}