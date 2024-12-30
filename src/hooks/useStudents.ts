import { StudentRecord, StudentCreateInput, StudentStatus } from '@/types/student';
import { validateStudent } from '@/utils/validation';
import { useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';

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
    const validationErrors = validateStudent(studentData);
    if (validationErrors.length > 0) {
      throw new Error(JSON.stringify(validationErrors));
    }

    const { data, error } = await supabase
      .from('students')
      .insert([studentData])
      .select();

    if (error) throw error;
    return data as StudentRecord[];
  }, []);

  return { getStudents, createStudent };
};
