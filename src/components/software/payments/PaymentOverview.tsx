import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "@/lib/utils";
import { CreditCard, History, Calendar, Wallet } from "lucide-react";

export function PaymentOverview() {
  const { data: paymentStats } = useQuery({
    queryKey: ["payment-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select(`
          amount,
          payment_date,
          method,
          invoice:invoice_id (
            status
          )
        `);

      if (error) throw error;
      return data;
    },
  });

  const totalPayments = paymentStats?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
  const pendingPayments = paymentStats?.filter(payment => payment.invoice.status === 'pending').length || 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Recaudado
          </CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalPayments)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pagos Pendientes
          </CardTitle>
          <History className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingPayments}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pagos del Mes
          </CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {paymentStats?.filter(payment => {
              const paymentDate = new Date(payment.payment_date);
              const now = new Date();
              return paymentDate.getMonth() === now.getMonth() &&
                     paymentDate.getFullYear() === now.getFullYear();
            }).length || 0}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Método más usado
          </CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold capitalize">
            {paymentStats?.reduce((acc, curr) => {
              const count = acc[curr.method] || 0;
              return { ...acc, [curr.method]: count + 1 };
            }, {} as Record<string, number>)
            // Get the method with the highest count
            && Object.entries(
              paymentStats.reduce((acc, curr) => {
                const count = acc[curr.method] || 0;
                return { ...acc, [curr.method]: count + 1 };
              }, {} as Record<string, number>)
            ).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}