import { useStudents } from "@/hooks/useStudents";
import { Student } from "@/types/student";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  MoreVertical, 
  FileEdit, 
  Trash2, 
  MessageCircle 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { StudentDetailsModal } from "./StudentDetailsModal";

interface StudentListProps {
  searchTerm?: string;
}

export function StudentList({ searchTerm = '' }: StudentListProps) {
  const { students, isLoading, loadStudents } = useStudents();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Load students when component mounts and when searchTerm changes
  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredStudents = students?.filter((student: Student) =>
    `${student.first_name} ${student.last_name} ${student.dni}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPaymentStatus = (student: Student) => {
    // This is a placeholder - implement actual payment status logic
    return (
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
        Al día
      </Badge>
    );
  };

  const getProgress = (student: Student) => {
    // This is a placeholder - implement actual progress calculation
    return (
      <div className="w-full max-w-xs">
        <Progress value={65} className="h-2" />
        <span className="text-xs text-muted-foreground mt-1">65% completado</span>
      </div>
    );
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Alumno</TableHead>
            <TableHead>DNI/NIE</TableHead>
            <TableHead>Tipo Permiso</TableHead>
            <TableHead>Progreso</TableHead>
            <TableHead>Prácticas</TableHead>
            <TableHead>Pagos</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents?.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>
                    {student.first_name[0]}
                    {student.last_name[0]}
                  </AvatarFallback>
                </Avatar>
                <span>{student.first_name} {student.last_name}</span>
              </TableCell>
              <TableCell>{student.dni}</TableCell>
              <TableCell>
                <Badge variant="secondary">B</Badge>
              </TableCell>
              <TableCell>{getProgress(student)}</TableCell>
              <TableCell>12/15</TableCell>
              <TableCell>{getPaymentStatus(student)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSelectedStudent(student)}>
                      <FileEdit className="mr-2 h-4 w-4" />
                      Ver detalles
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Añadir nota
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <StudentDetailsModal 
        student={selectedStudent} 
        open={!!selectedStudent} 
        onClose={() => setSelectedStudent(null)} 
      />
    </>
  );
}