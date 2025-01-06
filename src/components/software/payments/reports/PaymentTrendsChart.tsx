import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PaymentTrendsProps {
  period: string;
}

const generateSampleData = (period: string) => {
  const data = [];
  const now = new Date();
  const periods = period === 'month' ? 12 : 6;
  
  for (let i = 0; i < periods; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    data.unshift({
      name: date.toLocaleDateString('es-ES', { month: 'short', year: '2-digit' }),
      ingresos: Math.floor(Math.random() * 10000) + 5000,
      gastos: Math.floor(Math.random() * 5000) + 2000,
    });
  }
  
  return data;
};

export function PaymentTrendsChart({ period }: PaymentTrendsProps) {
  const data = generateSampleData(period);

  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Ingresos vs Gastos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Bar dataKey="ingresos" fill="#22c55e" />
              <Bar dataKey="gastos" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}