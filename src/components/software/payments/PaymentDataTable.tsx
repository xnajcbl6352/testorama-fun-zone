import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency, formatDate } from "@/lib/utils";
import { MoreVertical, FileText, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Payment {
  id: string;
  invoice: {
    student: {
      first_name: string;
      last_name: string;
    };
    invoice_number: string;
    amount: number;
    status: string;
  };
  method: string;
  payment_date: string;
}

export function PaymentDataTable() {
  const { toast } = useToast();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const { data: payments, isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select(`
          id,
          invoice:invoice_id (
            student:student_id (
              first_name,
              last_name
            ),
            invoice_number,
            amount,
            status
          ),
          method,
          payment_date
        `)
        .order("payment_date", { ascending: false });

      if (error) throw error;
      return data as Payment[];
    },
  });

  const handleGenerateReceipt = (paymentId: string) => {
    toast({
      title: "Generando recibo",
      description: "El recibo se está generando...",
    });
  };

  const handleSendReminder = (paymentId: string) => {
    toast({
      title: "Enviando recordatorio",
      description: "Se ha enviado el recordatorio de pago.",
    });
  };

  const handleMarkAsPaid = (paymentId: string) => {
    toast({
      title: "Marcando como pagado",
      description: "El pago se ha marcado como completado.",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "secondary",
      paid: "default",
      overdue: "destructive",
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status === "pending"
          ? "Pendiente"
          : status === "paid"
          ? "Pagado"
          : "Vencido"}
      </Badge>
    );
  };

  if (isLoading) {
    return <div>Cargando pagos...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID Pago</TableHead>
            <TableHead>Alumno</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Importe</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Método</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments?.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">
                {payment.invoice.invoice_number}
              </TableCell>
              <TableCell>
                {payment.invoice.student.first_name}{" "}
                {payment.invoice.student.last_name}
              </TableCell>
              <TableCell>{formatDate(payment.payment_date)}</TableCell>
              <TableCell>{formatCurrency(payment.invoice.amount)}</TableCell>
              <TableCell>{getStatusBadge(payment.invoice.status)}</TableCell>
              <TableCell className="capitalize">{payment.method}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleGenerateReceipt(payment.id)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Generar Recibo
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleSendReminder(payment.id)}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Recordatorio
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleMarkAsPaid(payment.id)}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Marcar como Pagado
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}