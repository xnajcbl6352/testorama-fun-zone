import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  dni: string;
  email: string | null;
  phone: string | null;
  registration_date: string;
  status: string;
}

interface StudentListProps {
  students: Student[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function StudentList({ students, onEdit, onDelete }: StudentListProps) {
  return (
    <div className="border rounded-lg">
      <Table>
        <thead>
          <tr>
            <th className="font-semibold">Nombre</th>
            <th className="font-semibold">DNI</th>
            <th className="font-semibold">Email</th>
            <th className="font-semibold">Teléfono</th>
            <th className="font-semibold">Fecha de Alta</th>
            <th className="font-semibold">Estado</th>
            <th className="font-semibold text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="font-medium">
                {student.first_name} {student.last_name}
              </td>
              <td>{student.dni}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>
                {format(new Date(student.registration_date), "dd/MM/yyyy", {
                  locale: es,
                })}
              </td>
              <td>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    student.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {student.status === "active" ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(student.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(student.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}