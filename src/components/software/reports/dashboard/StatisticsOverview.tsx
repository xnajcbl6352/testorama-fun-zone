import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "../../students/StatsCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ChartBar, Users, GraduationCap, Car } from "lucide-react";

export function StatisticsOverview() {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const { data: students } = await supabase
        .from('students')
        .select('id')
        .eq('status', 'active');

      const { data: classes } = await supabase
        .from('classes')
        .select('id')
        .eq('status', 'completed');

      const { data: vehicles } = await supabase
        .from('vehicles')
        .select('id')
        .eq('status', 'available');

      return {
        activeStudents: students?.length || 0,
        completedClasses: classes?.length || 0,
        availableVehicles: vehicles?.length || 0,
        passRate: 85 // This would be calculated based on actual data
      };
    }
  });

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <StatsCard
        title="Alumnos Activos"
        value={stats?.activeStudents || 0}
        trend="+12%"
        description="vs. mes anterior"
      />
      <StatsCard
        title="Clases Completadas"
        value={stats?.completedClasses || 0}
        trend="+8%"
        description="vs. mes anterior"
      />
      <StatsCard
        title="Vehículos Disponibles"
        value={stats?.availableVehicles || 0}
        trend="-2%"
        description="vs. mes anterior"
      />
      <StatsCard
        title="Tasa de Aprobados"
        value={`${stats?.passRate || 0}%`}
        trend="+5%"
        description="vs. mes anterior"
      />
    </div>
  );
}