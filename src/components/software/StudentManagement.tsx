import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Users, Search, Plus } from "lucide-react";

interface Student {
  id: number;
  name: string;
  dni: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
}

export function StudentManagement() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleAddStudent = () => {
    toast({
      title: "Función en desarrollo",
      description: "La funcionalidad de añadir estudiantes estará disponible próximamente.",
    });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Gestión de Alumnos</h2>
        </div>
        <Button onClick={handleAddStudent} className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Alumno
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Buscar alumnos..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-lg border">
        <div className="grid grid-cols-6 gap-4 p-4 font-medium text-gray-500 border-b">
          <div>DNI</div>
          <div className="col-span-2">Nombre</div>
          <div>Email</div>
          <div>Teléfono</div>
          <div>Estado</div>
        </div>
        
        {students.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No hay alumnos registrados
          </div>
        ) : (
          students.map((student) => (
            <div key={student.id} className="grid grid-cols-6 gap-4 p-4 border-b last:border-0 hover:bg-gray-50">
              <div>{student.dni}</div>
              <div className="col-span-2">{student.name}</div>
              <div>{student.email}</div>
              <div>{student.phone}</div>
              <div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  student.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {student.status === "active" ? "Activo" : "Inactivo"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}