import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "@/lib/utils";
import { CreditCard, History, Calendar, Wallet } from "lucide-react";

export function StudentPaymentView() {
  const { data: studentPayments } = useQuery({
    queryKey: ["student-payments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select(`
          id,
          amount,
          payment_date,
          method,
          invoice:invoice_id (
            student:student_id (
              first_name,
              last_name
            )
          )
        `)
        .order("payment_date", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Historial de Pagos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studentPayments?.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <p className="font-medium">
                    {payment.invoice.student.first_name}{" "}
                    {payment.invoice.student.last_name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(payment.payment_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(payment.amount)}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {payment.method}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Saldo Pendiente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(1250)} {/* Replace with actual data */}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Próximos Cargos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Clase práctica</span>
                <span>{formatCurrency(45)}</span>
              </li>
              <li className="flex justify-between">
                <span>Material didáctico</span>
                <span>{formatCurrency(30)}</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Métodos de Pago
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Tarjeta terminada en 4242</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}