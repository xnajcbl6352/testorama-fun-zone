import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Plus } from "lucide-react";

export function StudentEvaluations() {
  const { data: evaluations, isLoading } = useQuery({
    queryKey: ["evaluations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("feedback")
        .select("*, student:students(*)")
        .eq("type", "evaluation");
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Evaluaciones de Alumnos</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Evaluación
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {isLoading ? (
          <p>Cargando evaluaciones...</p>
        ) : evaluations?.length === 0 ? (
          <p>No hay evaluaciones registradas.</p>
        ) : (
          evaluations?.map((evaluation) => (
            <Card key={evaluation.id}>
              <CardHeader>
                <CardTitle>{evaluation.student?.first_name} {evaluation.student?.last_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <p>{evaluation.comment}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      Calificación: {evaluation.rating}/5
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}