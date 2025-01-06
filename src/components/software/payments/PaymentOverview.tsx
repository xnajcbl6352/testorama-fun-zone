import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PaymentSummaryCards } from "./reports/PaymentSummaryCards";
import { PaymentTrendsChart } from "./reports/PaymentTrendsChart";

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
    <div className="space-y-6">
      <PaymentSummaryCards
        totalIncome={stats?.monthlyIncome || 0}
        pendingAmount={stats?.pendingAmount || 0}
        upcomingPayments={stats?.upcomingPayments || 0}
      />
      <PaymentTrendsChart data={chartData} />
    </div>
  );
}