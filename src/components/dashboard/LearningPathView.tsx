import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, BookOpen, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface LearningPath {
  current_modules: {
    id: string;
    name: string;
    progress: number;
    type: string;
  }[];
  completed_modules: string[];
  recommendations: {
    type: string;
    description: string;
  }[];
}

export function LearningPathView() {
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);

  useEffect(() => {
    const fetchLearningPath = async () => {
      const { data, error } = await supabase
        .from("learning_paths")
        .select("*")
        .single();

      if (!error && data) {
        setLearningPath(data);
      }
    };

    fetchLearningPath();
  }, []);

  if (!learningPath) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Your Learning Path
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {learningPath.current_modules.map((module) => (
              <div key={module.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{module.name}</span>
                  </div>
                  <Badge variant="outline">{module.type}</Badge>
                </div>
                <Progress value={module.progress} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {learningPath.recommendations.map((rec, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg bg-muted/50"
              >
                <Badge className="mb-2">{rec.type}</Badge>
                <p className="text-sm text-muted-foreground">
                  {rec.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}