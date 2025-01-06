import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { 
  Download, 
  TrendingUp, 
  CreditCard,
  Euro,
  AlertCircle,
  Calendar
} from "lucide-react";

export function PaymentReports() {
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

  const incomeData = [
    { month: "Ene", amount: 4000 },
    { month: "Feb", amount: 3000 },
    { month: "Mar", amount: 2000 },
    { month: "Abr", amount: 2780 },
    { month: "May", amount: 1890 },
    { month: "Jun", amount: 2390 },
  ];

  const paymentMethodsData = [
    { name: "Tarjeta", value: 400 },
    { name: "Efectivo", value: 300 },
    { name: "Transferencia", value: 300 },
  ];

  const chartData = [
    { name: "Ene", ingresos: 4000, gastos: 2400 },
    { name: "Feb", ingresos: 3000, gastos: 1398 },
    { name: "Mar", ingresos: 2000, gastos: 9800 },
    { name: "Abr", ingresos: 2780, gastos: 3908 },
    { name: "May", ingresos: 1890, gastos: 4800 },
    { name: "Jun", ingresos: 2390, gastos: 3800 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="space-y-6">
      <div className="flex justify-end space-x-4">
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exportar a Excel
        </Button>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exportar a PDF
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Ingresos vs Gastos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Métodos de Pago
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethodsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentMethodsData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}