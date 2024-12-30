'use client'

import { useState } from "react"
import { Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  UserPlus, 
  Search, 
  Edit, 
  Trash2, 
  Mail,
  Phone,
  Calendar,
  User
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Student {
  id: number
  name: string
  dni: string
  email: string
  phone: string
  registrationDate: string
  status: "active" | "inactive"
}

const mockStudents: Student[] = [
  {
    id: 1,
    name: "Juan Pérez",
    dni: "12345678A",
    email: "juan@example.com",
    phone: "666555444",
    registrationDate: "2024-01-15",
    status: "active"
  },
  {
    id: 2,
    name: "María García",
    dni: "87654321B",
    email: "maria@example.com",
    phone: "666777888",
    registrationDate: "2024-01-16",
    status: "active"
  }
]

export function StudentManagement() {
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    // En una implementación real, esto sería una llamada a la API
    const filtered = mockStudents.filter(student => 
      student.name.toLowerCase().includes(term.toLowerCase()) ||
      student.dni.toLowerCase().includes(term.toLowerCase()) ||
      student.email.toLowerCase().includes(term.toLowerCase())
    )
    setStudents(filtered)
  }

  const handleAddStudent = () => {
    toast({
      title: "Función en desarrollo",
      description: "La funcionalidad de añadir alumnos estará disponible próximamente.",
    })
  }

  const handleEditStudent = (id: number) => {
    toast({
      title: "Función en desarrollo",
      description: "La funcionalidad de editar alumnos estará disponible próximamente.",
    })
  }

  const handleDeleteStudent = (id: number) => {
    toast({
      title: "Función en desarrollo",
      description: "La funcionalidad de eliminar alumnos estará disponible próximamente.",
    })
  }

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Alumnos</h2>
        <Button onClick={handleAddStudent} className="gap-2">
          <UserPlus className="h-4 w-4" />
          Nuevo Alumno
        </Button>
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
                <td className="font-medium">{student.name}</td>
                <td>{student.dni}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.registrationDate}</td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    student.status === "active" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {student.status === "active" ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditStudent(student.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteStudent(student.id)}
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
    </div>
  )
}