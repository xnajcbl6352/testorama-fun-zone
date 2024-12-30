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

interface StudentSelectProps {
  form: UseFormReturn<any>;
}

export function StudentSelect({ form }: StudentSelectProps) {
  const { data: students, isLoading } = useStudents();

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
              {students?.map((student) => (
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