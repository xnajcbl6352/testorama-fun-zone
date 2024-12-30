import { FileText, MoreHorizontal, Plus } from "lucide-react";
import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { useInvoices } from "@/hooks/useInvoices";
import { formatCurrency } from "@/lib/utils";
import { InvoiceForm } from "./InvoiceForm";

export function InvoiceList() {
  const { invoices, isLoading } = useInvoices();
  const [showCreateForm, setShowCreateForm] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Facturas</h2>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Factura
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nº Factura</TableHead>
            <TableHead>Alumno</TableHead>
            <TableHead>Importe</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha Vencimiento</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!invoices?.length ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No hay facturas registradas
              </TableCell>
            </TableRow>
          ) : (
            invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {invoice.invoice_number}
                  </div>
                </TableCell>
                <TableCell>
                  {invoice.students
                    ? `${invoice.students.first_name} ${invoice.students.last_name}`
                    : "N/A"}
                </TableCell>
                <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      invoice.status === "paid"
                        ? "secondary"
                        : invoice.status === "overdue"
                        ? "destructive"
                        : "default"
                    }
                  >
                    {invoice.status === "paid"
                      ? "Pagada"
                      : invoice.status === "overdue"
                      ? "Vencida"
                      : "Pendiente"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(invoice.due_date).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                      <DropdownMenuItem>Registrar pago</DropdownMenuItem>
                      <DropdownMenuItem>Descargar PDF</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <InvoiceForm open={showCreateForm} onClose={() => setShowCreateForm(false)} />
    </div>
  );
}