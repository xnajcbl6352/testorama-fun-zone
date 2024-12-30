import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { type StudentFormValues, type StudentRecord } from "@/components/software/students/studentSchema";
import { useToast } from "@/components/ui/use-toast";

export function useStudents() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loadStudents = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      toast({
        title: "Error al cargar alumnos",
        description: error.message,
        variant: "destructive",
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const searchStudents = async (term: string) => {
    try {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .or(
          `first_name.ilike.%${term}%,last_name.ilike.%${term}%,dni.ilike.%${term}%`
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      toast({
        title: "Error al buscar alumnos",
        description: error.message,
        variant: "destructive",
      });
      return [];
    }
  };

  const createStudent = async (values: StudentFormValues) => {
    try {
      // Check if student exists using maybeSingle() instead of single()
      const { data: existingStudent, error: searchError } = await supabase
        .from("students")
        .select("id")
        .eq("dni", values.dni)
        .maybeSingle();

      if (searchError) throw searchError;

      if (existingStudent) {
        toast({
          title: "Error al crear alumno",
          description: "Ya existe un alumno con ese DNI",
          variant: "destructive",
        });
        return false;
      }

      const studentData = {
        first_name: values.first_name,
        last_name: values.last_name,
        dni: values.dni,
        birth_date: values.birth_date,
        phone: values.phone || null,
        email: values.email || null,
        address: values.address || null,
        gdpr_consent: values.gdpr_consent,
        status: 'active',
        registration_date: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("students")
        .insert([studentData]);

      if (error) throw error;

      toast({
        title: "Alumno creado correctamente",
        description: "Se ha registrado el nuevo alumno en el sistema",
      });

      return true;
    } catch (error: any) {
      toast({
        title: "Error al crear alumno",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      const { error } = await supabase
        .from("students")
        .update({ status: "inactive" })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Alumno dado de baja correctamente",
        description: "Se ha actualizado el estado del alumno a inactivo",
      });

      return true;
    } catch (error: any) {
      toast({
        title: "Error al dar de baja al alumno",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    isLoading,
    loadStudents,
    searchStudents,
    createStudent,
    deleteStudent,
  };
}