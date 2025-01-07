import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export function InstructorSchedule() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();

  // Get the current user's ID when component mounts
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
    queryKey: ["instructor-classes", date, userId],
    queryFn: async () => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from("classes")
        .select("*, student:students!classes_student_id_fkey(*)")
        .eq("teacher_id", userId)
        .eq("date", date?.toISOString().split("T")[0])
        .order("start_time");
      
      if (error) {
        toast({
          title: "Error loading classes",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      return data;
    },
    enabled: !!userId, // Only run query when we have a userId
  });

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Calendario</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Clases del Día</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Cargando...</p>
          ) : !classes || classes.length === 0 ? (
            <p>No hay clases programadas para este día.</p>
          ) : (
            <div className="space-y-4">
              {classes.map((class_) => (
                <div key={class_.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{class_.student?.first_name} {class_.student?.last_name}</p>
                    <p className="text-sm text-gray-500">
                      {class_.start_time} - {class_.end_time}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    class_.status === "completed" ? "bg-green-100 text-green-800" :
                    class_.status === "cancelled" ? "bg-red-100 text-red-800" :
                    "bg-blue-100 text-blue-800"
                  }`}>
                    {class_.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}