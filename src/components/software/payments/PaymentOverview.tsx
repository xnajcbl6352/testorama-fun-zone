import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "@/lib/utils";
import { Euro, AlertCircle, Calendar, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function PaymentOverview() {
  const { data: stats } = useQuery({
    queryKey: ["payment-stats"],
    queryFn: async () => {
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      const { data: monthlyIncome } = await supabase
        .from("payments")
        .select("amount")
        .gte("payment_date", firstDayOfMonth.toISOString())
        .lte("payment_date", lastDayOfMonth.toISOString());

      const { data: pendingPayments } = await supabase
        .from("invoices")
        .select("amount")
        .eq("status", "pending");

      const { data: upcomingPayments } = await supabase
        .from("invoices")
        .select("amount, due_date")
        .eq("status", "pending")
        .gte("due_date", new Date().toISOString())
        .lte("due_date", new Date(now.setDate(now.getDate() + 30)).toISOString());

      return {
        monthlyIncome: monthlyIncome?.reduce((sum, p) => sum + p.amount, 0) || 0,
        pendingAmount: pendingPayments?.reduce((sum, p) => sum + p.amount, 0) || 0,
        upcomingPayments: upcomingPayments?.length || 0,
      };
    },
  });

  const chartData = [
    { name: "Ene", ingresos: 4000, gastos: 2400 },
    { name: "Feb", ingresos: 3000, gastos: 1398 },
    { name: "Mar", ingresos: 2000, gastos: 9800 },
    { name: "Abr", ingresos: 2780, gastos: 3908 },
    { name: "May", ingresos: 1890, gastos: 4800 },
    { name: "Jun", ingresos: 2390, gastos: 3800 },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Ingresos del Mes
          </CardTitle>
          <Euro className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(stats?.monthlyIncome || 0)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pagos Pendientes
          </CardTitle>
          <AlertCircle className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(stats?.pendingAmount || 0)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Próximos Vencimientos
          </CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.upcomingPayments || 0}</div>
        </CardContent>
      </Card>

      <Card className="col-span-full lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Ingresos vs Gastos
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Bar dataKey="ingresos" fill="#22c55e" />
                <Bar dataKey="gastos" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}