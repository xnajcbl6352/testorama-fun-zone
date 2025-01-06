import { Card } from "@/components/ui/card";
import { Calendar, Target, Users, TrendingUp } from "lucide-react";
import { Campaign } from "@/types/campaign";

export interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const getStatusColor = (status?: string) => {
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
          <span>
            {new Date(campaign.start_date).toLocaleDateString()} - 
            {campaign.end_date ? new Date(campaign.end_date).toLocaleDateString() : 'Ongoing'}
          </span>
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
}