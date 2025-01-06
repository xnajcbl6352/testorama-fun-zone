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
  Calendar,
  Eye
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
import { Card, CardContent } from "@/components/ui/card";

interface StudentListProps {
  searchTerm?: string;
  viewType: "grid" | "list";
}

export function StudentList({ searchTerm = '', viewType }: StudentListProps) {
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

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      active: "default",
      pending: "secondary",
      inactive: "outline"
    };
    return (
      <Badge variant={variants[status] || "default"}>
        {status === 'active' ? 'Activo' : status === 'pending' ? 'Pendiente' : 'Inactivo'}
      </Badge>
    );
  };

  const getProgress = (student: Student) => (
    <div className="space-y-2">
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span>Teoría</span>
          <span className="text-muted-foreground">65%</span>
        </div>
        <Progress value={65} className="h-2" />
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span>Práctica</span>
          <span className="text-muted-foreground">12/15</span>
        </div>
        <Progress value={80} className="h-2" />
      </div>
    </div>
  );

  const StudentActions = ({ student }: { student: Student }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setSelectedStudent(student)}>
          <Eye className="mr-2 h-4 w-4" />
          Ver perfil
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Calendar className="mr-2 h-4 w-4" />
          Programar clase
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MessageCircle className="mr-2 h-4 w-4" />
          Enviar mensaje
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FileEdit className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          Dar de baja
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  if (viewType === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents?.map((student) => (
          <Card key={student.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>
                      {student.first_name[0]}
                      {student.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">
                      {student.first_name} {student.last_name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{student.dni}</p>
                  </div>
                </div>
                <StudentActions student={student} />
              </div>
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  {getStatusBadge(student.status)}
                  <div className="text-sm text-muted-foreground">
                    Último acceso: {formatDate(student.updated_at || '')}
                  </div>
                </div>
                {getProgress(student)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

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
              <TableCell>
                <Badge variant="outline">B</Badge>
              </TableCell>
              <TableCell>{getStatusBadge(student.status)}</TableCell>
              <TableCell className="max-w-[200px]">{getProgress(student)}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDate(student.updated_at || '')}
              </TableCell>
              <TableCell className="text-right">
                <StudentActions student={student} />
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