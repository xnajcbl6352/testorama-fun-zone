import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Star, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Achievement {
  id: string;
  name: string;
  description: string;
  points: number;
  icon_url?: string;
}

export function AchievementsDisplay() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      const { data, error } = await supabase
        .from("student_achievements")
        .select(`
          achievement_id,
          achievements (
            id,
            name,
            description,
            points,
            icon_url
          )
        `);

      if (!error && data) {
        setAchievements(data.map(item => item.achievements));
      }
    };

    fetchAchievements();
  }, []);

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
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-center justify-between p-4 border rounded-lg bg-card"
            >
              <div className="flex items-center gap-3">
                {achievement.icon_url ? (
                  <img
                    src={achievement.icon_url}
                    alt={achievement.name}
                    className="w-8 h-8"
                  />
                ) : (
                  <Award className="w-8 h-8 text-primary" />
                )}
                <div>
                  <h4 className="font-semibold">{achievement.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                {achievement.points} points
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}