import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, ArrowDownIcon, Plus, Calendar, CreditCard, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "@/lib/utils";

export function KPIOverview() {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const { data: students } = await supabase
        .from('students')
        .select('id')
        .eq('status', 'active');

      const { data: classes } = await supabase
        .from('classes')
        .select('*')
        .gte('date', new Date().toISOString().split('T')[0])
        .lte('date', new Date().toISOString().split('T')[0]);

      const { data: payments } = await supabase
        .from('invoices')
        .select('amount')
        .eq('status', 'pending');

      return {
        activeStudents: students?.length || 0,
        todayClasses: classes?.length || 0,
        pendingPayments: payments?.reduce((sum, p) => sum + p.amount, 0) || 0,
        passRate: 85 // Placeholder - implement actual calculation
      };
    }
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Students</CardTitle>
          <Button variant="ghost" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.activeStudents || 0}</div>
          <div className="flex items-center pt-1 text-xs text-green-600">
            <ArrowUpIcon className="h-4 w-4 mr-1" />
            12% from last month
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.todayClasses || 0}</div>
          <div className="text-xs text-muted-foreground">
            Next class in 2 hours
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats?.pendingPayments || 0)}</div>
          <div className="flex items-center pt-1 text-xs text-red-600">
            <ArrowUpIcon className="h-4 w-4 mr-1" />
            8% increase
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.passRate || 0}%</div>
          <div className="flex items-center pt-1 text-xs text-green-600">
            <ArrowUpIcon className="h-4 w-4 mr-1" />
            5% improvement
          </div>
        </CardContent>
      </Card>
    </div>
  );
}