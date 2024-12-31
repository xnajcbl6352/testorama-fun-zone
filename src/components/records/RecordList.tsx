import { FileText, MoreHorizontal, Send, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RecordStatusBadge } from "./RecordStatusBadge";
import { RecordDetail } from "./RecordDetail";
import { useState } from "react";
import type { Record } from "@/types/record";

interface RecordListProps {
  records: Record[];
  onView: (record: Record) => void;
  onEdit: (record: Record) => void;
  onDelete: (id: string) => void;
  onSubmitToDGT: (id: string) => void;
}

export function RecordList({
  records,
  onView,
  onEdit,
  onDelete,
  onSubmitToDGT,
}: RecordListProps) {
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nº Expediente</TableHead>
            <TableHead>Alumno</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha de Envío</TableHead>
            <TableHead>Documentos</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No hay expedientes registrados
              </TableCell>
            </TableRow>
          ) : (
            records.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {record.record_number}
                  </div>
                </TableCell>
                <TableCell>
                  {record.student
                    ? `${record.student.first_name} ${record.student.last_name}`
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <RecordStatusBadge status={record.status} />
                </TableCell>
                <TableCell>
                  {record.dgt_submission_date
                    ? new Date(record.dgt_submission_date).toLocaleDateString()
                    : "-"}
                </TableCell>
                <TableCell>
                  {record.document_url ? (
                    <Button variant="ghost" size="sm" asChild className="h-8 w-8">
                      <a
                        href={record.document_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <File className="h-4 w-4" />
                      </a>
                    </Button>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedRecord(record)}>
                        Ver detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(record)}>
                        Editar
                      </DropdownMenuItem>
                      {record.status === "pending" && (
                        <DropdownMenuItem onClick={() => onSubmitToDGT(record.id)}>
                          <Send className="mr-2 h-4 w-4" />
                          Enviar a DGT
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => onDelete(record.id)}
                      >
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {selectedRecord && (
        <RecordDetail
          record={selectedRecord}
          open={true}
          onClose={() => setSelectedRecord(null)}
          onSubmitToDGT={onSubmitToDGT}
        />
      )}
    </>
  );
}