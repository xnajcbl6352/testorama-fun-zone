import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export function ClassNotes() {
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    getCurrentUser();
  }, []);

  const { data: classes, isLoading } = useQuery({
    queryKey: ["class-notes", userId],
    queryFn: async () => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from("classes")
        .select("*, student:students!classes_student_id_fkey(*)")
        .eq("teacher_id", userId)
        .not("notes", "is", null)
        .order("date", { ascending: false });
      
      if (error) {
        toast({
          title: "Error loading class notes",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      return data;
    },
    enabled: !!userId,
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Notas de Clase</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Nota
        </Button>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          <p>Cargando notas...</p>
        ) : !classes || classes.length === 0 ? (
          <p>No hay notas registradas.</p>
        ) : (
          classes.map((class_) => (
            <Card key={class_.id}>
              <CardHeader>
                <CardTitle>{class_.student?.first_name} {class_.student?.last_name}</CardTitle>
                <p className="text-sm text-gray-500">{new Date(class_.date).toLocaleDateString()}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 text-gray-500 mt-1" />
                  <p>{class_.notes}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}