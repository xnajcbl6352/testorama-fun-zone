import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Users, Gift, Award } from "lucide-react";

export function ReferralProgram() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <Share2 className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Share & Earn</h3>
          <p className="text-sm text-gray-600 mb-4">
            Share your referral link and earn rewards for each successful referral
          </p>
          <Button variant="outline" className="w-full">Copy Referral Link</Button>
        </Card>

        <Card className="p-6">
          <Users className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Active Referrals</h3>
          <p className="text-sm text-gray-600 mb-4">
            Track your referrals and their status in real-time
          </p>
          <Button variant="outline" className="w-full">View Referrals</Button>
        </Card>

        <Card className="p-6">
          <Gift className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Rewards</h3>
          <p className="text-sm text-gray-600 mb-4">
            View and redeem your earned rewards from successful referrals
          </p>
          <Button variant="outline" className="w-full">View Rewards</Button>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Referral Leaderboard</h3>
            <p className="text-sm text-gray-600">Top referrers this month</p>
          </div>
          <Award className="h-6 w-6 text-primary" />
        </div>
        <div className="space-y-4">
          {/* Placeholder for leaderboard data */}
          <p className="text-center text-muted-foreground">Leaderboard coming soon</p>
        </div>
      </Card>
    </div>
  );
}