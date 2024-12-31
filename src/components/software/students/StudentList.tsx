import { useStudents } from "@/hooks/useStudents";
import { Student } from "@/types/student";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface StudentListProps {
  searchTerm?: string;  // Make searchTerm optional
}

export function StudentList({ searchTerm = '' }: StudentListProps) {
  const { students, isLoading } = useStudents();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredStudents = students?.filter((student: Student) =>
    `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>DNI</TableHead>
          <TableHead>Estado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredStudents?.length ? (
          filteredStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{`${student.first_name} ${student.last_name}`}</TableCell>
              <TableCell>{student.dni}</TableCell>
              <TableCell>{student.status}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} className="text-center text-muted-foreground">
              No hay estudiantes registrados
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
