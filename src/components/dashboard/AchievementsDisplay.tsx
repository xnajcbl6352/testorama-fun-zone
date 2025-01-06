import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Star, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Achievement {
  id: string;
  name: string;
  description: string;
  points: number;
  icon_url?: string;
  category: 'Speed' | 'Accuracy' | 'Persistence';
  tier: 'Bronze' | 'Silver' | 'Gold';
  next_tier_threshold?: number;
}

interface AchievementProgress {
  achievement: Achievement;
  current_progress: number;
}

export function AchievementsDisplay() {
  const [achievements, setAchievements] = useState<AchievementProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const { data: progressData, error: progressError } = await supabase
          .from("achievement_progress")
          .select(`
            current_progress,
            achievement:achievements (
              id,
              name,
              description,
              points,
              icon_url,
              category,
              tier,
              next_tier_threshold
            )
          `);

        if (progressError) throw progressError;

        if (progressData) {
          setAchievements(progressData.map(item => ({
            achievement: item.achievement,
            current_progress: item.current_progress
          })));
        }
      } catch (error) {
        console.error('Error fetching achievements:', error);
        toast({
          title: "Error",
          description: "Failed to load achievements",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [toast]);

  const getCategoryIcon = (category: Achievement['category']) => {
    switch (category) {
      case 'Speed':
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 'Accuracy':
        return <Star className="h-5 w-5 text-blue-500" />;
      case 'Persistence':
        return <Award className="h-5 w-5 text-purple-500" />;
      default:
        return <Trophy className="h-5 w-5 text-primary" />;
    }
  };

  const getTierColor = (tier: Achievement['tier']) => {
    switch (tier) {
      case 'Bronze':
        return 'bg-orange-100 text-orange-800';
      case 'Silver':
        return 'bg-gray-100 text-gray-800';
      case 'Gold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary animate-pulse" />
            Loading Achievements...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Your Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {achievements.map(({ achievement, current_progress }) => (
            <div
              key={achievement.id}
              className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  {achievement.icon_url ? (
                    <img
                      src={achievement.icon_url}
                      alt={achievement.name}
                      className="w-8 h-8"
                    />
                  ) : (
                    getCategoryIcon(achievement.category)
                  )}
                </div>
                <div>
                  <h4 className="font-semibold">{achievement.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className={getTierColor(achievement.tier)}>
                      {achievement.tier}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {achievement.category}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  {achievement.points} points
                </Badge>
                {achievement.next_tier_threshold && (
                  <div className="text-xs text-muted-foreground">
                    Progress: {current_progress}/{achievement.next_tier_threshold}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}