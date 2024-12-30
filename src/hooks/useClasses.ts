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
            first_name,
            last_name
          ),
          student:student_id(
            first_name,
            last_name
          ),
          vehicle:vehicle_id(
            plate_number,
            brand,
            model
          )
        `)
        .order('date', { ascending: true });

      if (error) throw error;

      return (data || []) as Class[];
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