import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { type StudentFormValues, type StudentRecord, StudentStatus } from '@/components/software/students/studentSchema';

export const useStudents = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loadStudents = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []) as StudentRecord[];
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
        .from('students')
        .select('*')
        .or(`first_name.ilike.%${term}%,last_name.ilike.%${term}%,dni.ilike.%${term}%,email.ilike.%${term}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []) as StudentRecord[];
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

  const createStudent = async (values: StudentFormValues): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const { data: existingStudent, error: searchError } = await supabase
        .from("students")
        .select("id")
        .eq("dni", values.dni)
        .single();

      if (searchError && searchError.code !== 'PGRST116') throw searchError;

      if (existingStudent) {
        toast({
          title: "Error al crear alumno",
          description: "Ya existe un alumno con ese DNI",
          variant: "destructive",
        });
        return false;
      }

      const now = new Date().toISOString();
      const studentData = {
        ...values,
        registration_date: now,
        status: StudentStatus.active,
        created_at: now,
        updated_at: now,
      };

      const { error } = await supabase
        .from("students")
        .insert([studentData]);

      if (error) throw error;

      toast({
        title: "Alumno creado",
        description: "El alumno ha sido registrado correctamente",
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

  const updateStudent = async (id: string, values: Partial<StudentFormValues>): Promise<boolean> => {
    try {
      setIsLoading(true);

      if (values.dni) {
        const { data: existingStudent, error: searchError } = await supabase
          .from("students")
          .select("id")
          .eq("dni", values.dni)
          .neq("id", id)
          .single();

        if (searchError && searchError.code !== 'PGRST116') throw searchError;

        if (existingStudent) {
          toast({
            title: "Error al actualizar alumno",
            description: "Ya existe otro alumno con ese DNI",
            variant: "destructive",
          });
          return false;
        }
      }

      const updateData = {
        ...values,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("students")
        .update(updateData)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Alumno actualizado",
        description: "Los datos del alumno han sido actualizados correctamente",
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

  const deleteStudent = async (id: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from("students")
        .update({ 
          status: StudentStatus.inactive,
          updated_at: new Date().toISOString()
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Alumno dado de baja",
        description: "El alumno ha sido dado de baja correctamente",
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
};