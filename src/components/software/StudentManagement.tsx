import { useState } from "react";
import { Search, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StudentForm } from "./students/StudentForm";
import { type StudentFormValues, type StudentRecord } from "./students/studentSchema";
import { StudentList } from "./students/StudentList";
import { supabase } from "@/integrations/supabase/client";

export function StudentManagement() {
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const loadStudents = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setStudents(data || []);
    } catch (error: any) {
      toast({
        title: "Error al cargar alumnos",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    try {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .or(
          `first_name.ilike.%${term}%,last_name.ilike.%${term}%,dni.ilike.%${term}%`
        )
        .order("created_at", { ascending: false });

      if (error) throw error;

      setStudents(data || []);
    } catch (error: any) {
      toast({
        title: "Error al buscar alumnos",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (values: StudentFormValues) => {
    try {
      // Check if DNI already exists
      const { data: existingStudent } = await supabase
        .from("students")
        .select("id")
        .eq("dni", values.dni)
        .single();

      if (existingStudent) {
        toast({
          title: "Error al crear alumno",
          description: "Ya existe un alumno con ese DNI",
          variant: "destructive",
        });
        return;
      }

      // Convert form values to match database schema
      const studentData: Omit<StudentRecord, 'id' | 'created_at' | 'updated_at'> = {
        ...values,
        status: 'active',
      };

      const { error } = await supabase
        .from("students")
        .insert([studentData]);

      if (error) throw error;

      toast({
        title: "Alumno creado correctamente",
        description: "Se ha registrado el nuevo alumno en el sistema",
      });

      setIsDialogOpen(false);
      loadStudents();
    } catch (error: any) {
      toast({
        title: "Error al crear alumno",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteStudent = async (id: string) => {
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

      loadStudents();
    } catch (error: any) {
      toast({
        title: "Error al dar de baja al alumno",
        description: error.message,
        variant: "destructive",
      });
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
      />
    </div>
  );
}