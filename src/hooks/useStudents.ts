import { useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface StudentCreateInput {
  first_name: string;
  last_name: string;
  dni: string;
  birth_date: string;
  registration_date: string;
  status: 'active' | 'inactive';
  phone?: string;
  email?: string;
  address?: string;
  gdpr_consent?: boolean;
}

interface StudentResponse {
  id: string;
  first_name: string;
  last_name: string;
  dni: string;
  birth_date: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  registration_date: string;
  status: 'active' | 'inactive';
  gdpr_consent: boolean;
  created_at: string;
  updated_at: string;
}

export const useStudents = () => {
  const getStudents = useCallback(async () => {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as StudentResponse[];
  }, []);

  const createStudent = useCallback(async (studentData: StudentCreateInput) => {
    const requiredFields: (keyof StudentCreateInput)[] = [
      'first_name',
      'last_name',
      'dni',
      'birth_date',
      'registration_date',
      'status'
    ];

    // Validar campos requeridos
    for (const field of requiredFields) {
      if (!studentData[field]) {
        throw new Error(`El campo ${field} es requerido`);
      }
    }

    const { data, error } = await supabase
      .from('students')
      .insert([studentData])
      .select();

    if (error) throw error;
    return data as StudentResponse[];
  }, []);

  const updateStudent = useCallback(async (id: string, updates: Partial<StudentCreateInput>) => {
    const { data, error } = await supabase
      .from('students')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data as StudentResponse[];
  }, []);

  const deleteStudent = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }, []);

  return {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
  };
};

export type { StudentCreateInput, StudentResponse };
