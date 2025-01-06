import { FileText, MoreHorizontal, Plus, Receipt, Send } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

export function InvoiceList() {
  const { invoices, isLoading } = useInvoices();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { toast } = useToast();

  const handleSendReminder = (invoiceId: string) => {
    toast({
      title: "Recordatorio enviado",
      description: "Se ha enviado un recordatorio de pago al alumno",
    });
  };

  const handleGenerateReceipt = (invoiceId: string) => {
    toast({
      title: "Recibo generado",
      description: "El recibo se ha generado correctamente",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Facturas</h2>
          <p className="text-muted-foreground">
            Gestiona las facturas y pagos de tus alumnos
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Factura
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
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
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground h-32"
                >
                  No hay facturas registradas
                </TableCell>
              </TableRow>
            ) : (
              invoices.map((invoice) => (
                <TableRow key={invoice.id} className="group">
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
                      className="capitalize"
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
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => handleGenerateReceipt(invoice.id)}>
                          <Receipt className="h-4 w-4 mr-2" />
                          Generar recibo
                        </DropdownMenuItem>
                        {invoice.status !== "paid" && (
                          <DropdownMenuItem onClick={() => handleSendReminder(invoice.id)}>
                            <Send className="h-4 w-4 mr-2" />
                            Enviar recordatorio
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <InvoiceForm open={showCreateForm} onClose={() => setShowCreateForm(false)} />
    </div>
  );
}