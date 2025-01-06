import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StudentForm } from "./StudentForm";
import { useStudents } from "@/hooks/useStudents";
import { StudentFormValues } from "@/types/student";

interface NewStudentModalProps {
  open: boolean;
  onClose: () => void;
}

export function NewStudentModal({ open, onClose }: NewStudentModalProps) {
  const { createStudent } = useStudents();

  const handleSubmit = async (values: StudentFormValues) => {
    const success = await createStudent(values);
    if (success) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nuevo Alumno</DialogTitle>
        </DialogHeader>
        <StudentForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}