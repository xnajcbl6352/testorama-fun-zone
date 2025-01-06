import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, BookOpen, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Module {
  id: string;
  name: string;
  progress: number;
  type: string;
}

interface LearningPath {
  current_modules: Module[];
  completed_modules: string[];
  recommendations: {
    type: string;
    description: string;
  }[];
}

interface SupabaseLearningPath {
  id: string;
  student_id: string | null;
  current_modules: any;
  completed_modules: any;
  recommendations: any;
  last_updated: string;
}

export function LearningPathView() {
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLearningPath = async () => {
      try {
        const { data, error } = await supabase
          .from("learning_paths")
          .select("*")
          .single();

        if (error) throw error;

        if (data) {
          const supabasePath = data as SupabaseLearningPath;
          const transformedPath: LearningPath = {
            current_modules: supabasePath.current_modules || [],
            completed_modules: supabasePath.completed_modules || [],
            recommendations: supabasePath.recommendations || [],
          };
          setLearningPath(transformedPath);
        }
      } catch (error) {
        console.error('Error fetching learning path:', error);
        toast({
          title: "Error",
          description: "Failed to load learning path",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLearningPath();
  }, [toast]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary animate-pulse" />
              Loading Learning Path...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-6 bg-gray-100 rounded animate-pulse" />
                  <div className="h-4 bg-gray-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                  <Badge 
                    variant="outline" 
                    className="animate-in fade-in slide-in-from-right duration-300"
                  >
                    {module.type}
                  </Badge>
                </div>
                <Progress 
                  value={module.progress} 
                  className="animate-in fade-in slide-in-from-bottom duration-500"
                />
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
                className="p-4 border rounded-lg bg-muted/50 animate-in fade-in slide-in-from-bottom duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
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
