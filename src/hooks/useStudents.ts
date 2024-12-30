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
      setIsLoading(true);
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .or(
          `first_name.ilike.%${term}%,last_name.ilike.%${term}%,dni.ilike.%${term}%,email.ilike.%${term}%`
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
    } finally {
      setIsLoading(false);
    }
  };

  const createStudent = async (values: StudentFormValues) => {
    try {
      setIsLoading(true);
      
      // Check if student exists
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
        ...values,
        registration_date: new Date().toISOString(),
        status: "active",
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
    } finally {
      setIsLoading(false);
    }
  };

  const updateStudent = async (id: string, values: StudentFormValues) => {
    try {
      setIsLoading(true);

      // Check if DNI exists for other students
      const { data: existingStudent, error: searchError } = await supabase
        .from("students")
        .select("id")
        .eq("dni", values.dni)
        .neq("id", id)
        .maybeSingle();

      if (searchError) throw searchError;

      if (existingStudent) {
        toast({
          title: "Error al actualizar alumno",
          description: "Ya existe otro alumno con ese DNI",
          variant: "destructive",
        });
        return false;
      }

      const { error } = await supabase
        .from("students")
        .update(values)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Alumno actualizado correctamente",
        description: "Se han guardado los cambios del alumno",
      });

      return true;
    } catch (error: any) {
      toast({
        title: "Error al actualizar alumno",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    loadStudents,
    searchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
  };
}