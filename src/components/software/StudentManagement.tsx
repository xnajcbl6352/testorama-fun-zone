import { useState } from "react";
import { Search, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StudentForm } from "./students/StudentForm";
import { type StudentRecord, type StudentFormValues } from "./students/studentSchema";
import { StudentList } from "./students/StudentList";
import { RecordForm } from "./records/RecordForm";
import { RecordList } from "./records/RecordList";
import { useStudents } from "@/hooks/useStudents";

export function StudentManagement() {
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [showRecordForm, setShowRecordForm] = useState(false);
  const { isLoading, loadStudents, searchStudents, createStudent, deleteStudent } = useStudents();

  // Load students on mount
  useState(() => {
    loadStudents().then(setStudents);
  }, []);

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    const results = await searchStudents(term);
    setStudents(results);
  };

  const onSubmit = async (values: StudentFormValues) => {
    const success = await createStudent(values);
    if (success) {
      setIsDialogOpen(false);
      const updatedStudents = await loadStudents();
      setStudents(updatedStudents);
    }
  };

  const handleDeleteStudent = async (id: string) => {
    const success = await deleteStudent(id);
    if (success) {
      const updatedStudents = await loadStudents();
      setStudents(updatedStudents);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Alumnos</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Nuevo Alumno
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Alumno</DialogTitle>
            </DialogHeader>
            <StudentForm onSubmit={onSubmit} isLoading={isLoading} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por nombre, DNI o email..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <StudentList
        students={students}
        onEdit={(id) => console.log("Edit student", id)}
        onDelete={handleDeleteStudent}
        onViewRecords={setSelectedStudent}
      />

      {selectedStudent && (
        <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Expedientes del Alumno</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button
                  onClick={() => setShowRecordForm(!showRecordForm)}
                  className="gap-2"
                >
                  {showRecordForm ? "Cancelar" : "Nuevo Expediente"}
                </Button>
              </div>
              
              {showRecordForm ? (
                <RecordForm
                  studentId={selectedStudent}
                  onSuccess={() => {
                    setShowRecordForm(false);
                    // Refresh records list
                  }}
                  onCancel={() => setShowRecordForm(false)}
                />
              ) : (
                <RecordList studentId={selectedStudent} />
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}