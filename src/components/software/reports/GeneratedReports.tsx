import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Share2, Trash2 } from "lucide-react";

export function GeneratedReports() {
  const reports = [
    {
      name: "Informe Mensual",
      type: "Académico",
      created: "2024-01-05",
      lastAccessed: "2024-01-06",
      size: "2.4 MB",
    },
    // Add more sample reports as needed
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informes Generados</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Fecha Creación</TableHead>
              <TableHead>Último Acceso</TableHead>
              <TableHead>Tamaño</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.name}>
                <TableCell>{report.name}</TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.created}</TableCell>
                <TableCell>{report.lastAccessed}</TableCell>
                <TableCell>{report.size}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}