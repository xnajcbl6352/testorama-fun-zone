import { useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { StudentRecord, StudentCreateInput, StudentStatus, Database } from '@/types/student';

export const useStudents = () => {
  const getStudents = useCallback(async () => {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as StudentRecord[];
  }, []);

  const createStudent = useCallback(async (studentData: StudentCreateInput) => {
    // Validar campos requeridos
    const requiredFields: (keyof StudentCreateInput)[] = [
      'first_name',
      'last_name',
      'dni',
      'birth_date',
      'registration_date',
      'status'
    ];

    for (const field of requiredFields) {
      if (!studentData[field]) {
        throw new Error(`El campo ${field} es requerido`);
      }
    }

    // Asegurarse de que status es del tipo correcto
    if (!['active', 'inactive'].includes(studentData.status)) {
      throw new Error('Estado inválido');
    }

    const { data, error } = await supabase
      .from('students')
      .insert({
        ...studentData,
        gdpr_consent: studentData.gdpr_consent ?? false,
      })
      .select();

    if (error) throw error;
    return data as StudentRecord[];
  }, []);

  const updateStudent = useCallback(async (id: string, updates: Partial<StudentCreateInput>) => {
    const { data, error } = await supabase
      .from('students')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data as StudentRecord[];
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

export type { StudentCreateInput, StudentRecord, StudentStatus };