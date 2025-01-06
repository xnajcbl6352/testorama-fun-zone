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
  MessageCircle,
  Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { StudentDetailsModal } from "./StudentDetailsModal";
import { formatDate } from "@/lib/utils";

interface StudentListProps {
  searchTerm?: string;
}

export function StudentList({ searchTerm = '' }: StudentListProps) {
  const { students, isLoading, loadStudents } = useStudents();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    loadStudents();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const filteredStudents = students?.filter((student: Student) =>
    `${student.first_name} ${student.last_name} ${student.dni}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLicenseType = (student: Student) => {
    // This is a placeholder - implement actual license type logic
    return (
      <Badge variant="outline">B</Badge>
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

  const getPendingClasses = (student: Student) => {
    // This is a placeholder - implement actual pending classes logic
    return (
      <Badge variant="secondary" className="font-mono">
        3
      </Badge>
    );
  };

  return (
    <div className="relative">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Alumno</TableHead>
            <TableHead>DNI/NIE</TableHead>
            <TableHead>Tipo Permiso</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Progreso</TableHead>
            <TableHead>Clases Pendientes</TableHead>
            <TableHead>Último Acceso</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents?.map((student) => (
            <TableRow key={student.id} className="group">
              <TableCell className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>
                    {student.first_name[0]}
                    {student.last_name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{student.first_name} {student.last_name}</div>
                  <div className="text-sm text-muted-foreground">{student.email}</div>
                </div>
              </TableCell>
              <TableCell>{student.dni}</TableCell>
              <TableCell>{getLicenseType(student)}</TableCell>
              <TableCell>
                <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                  {student.status === 'active' ? 'Activo' : 'Inactivo'}
                </Badge>
              </TableCell>
              <TableCell>{getProgress(student)}</TableCell>
              <TableCell>{getPendingClasses(student)}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDate(student.updated_at || '')}
              </TableCell>
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
                      <Calendar className="mr-2 h-4 w-4" />
                      Programar clase
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Enviar mensaje
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Dar de baja
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
    </div>
  );
}