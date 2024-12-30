import { useEffect, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStudents } from "@/hooks/useStudents";
import { UseFormReturn } from "react-hook-form";
import type { StudentRecord } from "@/types/student";

interface StudentSelectProps {
  form: UseFormReturn<any>;
}

export function StudentSelect({ form }: StudentSelectProps) {
  const { loadStudents, isLoading } = useStudents();
  const [students, setStudents] = useState<StudentRecord[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const data = await loadStudents();
      setStudents(data);
    };
    fetchStudents();
  }, [loadStudents]);

  if (isLoading) {
    return <div>Loading students...</div>;
  }

  return (
    <FormField
      control={form.control}
      name="student_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Student</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a student" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {students.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  {student.first_name} {student.last_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}