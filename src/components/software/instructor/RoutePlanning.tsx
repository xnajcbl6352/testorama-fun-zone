import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Navigation } from "lucide-react";

export function RoutePlanning() {
  const { data: routes, isLoading } = useQuery({
    queryKey: ["routes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("classes")
        .select("*, student:students!classes_student_id_fkey(*)")
        .eq("teacher_id", "current-user-id")
        .order("start_time");
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Planificación de Rutas</h2>
        <Button>
          <Navigation className="h-4 w-4 mr-2" />
          Optimizar Ruta
        </Button>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          <p>Cargando rutas...</p>
        ) : routes?.length === 0 ? (
          <p>No hay rutas planificadas.</p>
        ) : (
          routes?.map((route) => (
            <Card key={route.id}>
              <CardHeader>
                <CardTitle>Clase con {route.student?.first_name} {route.student?.last_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <p>{route.student?.address}</p>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {route.start_time} - {route.end_time}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}