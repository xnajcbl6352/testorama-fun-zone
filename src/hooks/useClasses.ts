import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Class } from "@/types/class";

export const useClasses = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loadClasses = async (): Promise<Class[]> => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('classes')
        .select(`
          *,
          teacher:teacher_id(
            id,
            first_name,
            last_name
          ),
          student:student_id(
            id,
            first_name,
            last_name
          ),
          vehicle:vehicle_id(
            id,
            plate_number,
            brand,
            model
          )
        `)
        .order('date', { ascending: true });

      if (error) throw error;

      // Ensure the data matches our Class interface
      const typedClasses: Class[] = (data || []).map(item => ({
        id: item.id,
        type: item.type,
        teacher_id: item.teacher_id,
        student_id: item.student_id,
        vehicle_id: item.vehicle_id,
        date: item.date,
        start_time: item.start_time,
        end_time: item.end_time,
        status: item.status,
        attendance_marked: item.attendance_marked,
        notes: item.notes,
        created_at: item.created_at,
        updated_at: item.updated_at,
        teacher: item.teacher ? {
          first_name: item.teacher.first_name,
          last_name: item.teacher.last_name
        } : null,
        student: item.student ? {
          first_name: item.student.first_name,
          last_name: item.student.last_name
        } : null,
        vehicle: item.vehicle ? {
          plate_number: item.vehicle.plate_number,
          brand: item.vehicle.brand,
          model: item.vehicle.model
        } : null
      }));

      return typedClasses;
    } catch (error: any) {
      toast({
        title: "Error al cargar clases",
        description: error.message,
        variant: "destructive",
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    loadClasses
  };
};