import { Card, CardContent } from "@/components/ui/card";
import { StatsCard } from "./StatsCard";
import { StudentList } from "./StudentList";
import { StudentSearch } from "./StudentSearch";
import { useStudents } from "@/hooks/useStudents";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function StudentDashboard() {
  const { students, isLoading, loadStudents } = useStudents();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch quick stats data
  const { data: quickStats } = useQuery({
    queryKey: ['student-stats'],
    queryFn: async () => {
      const { data: activeStudents } = await supabase
        .from('students')
        .select('id')
        .eq('status', 'active');

      const { data: pendingExams } = await supabase
        .from('records')
        .select('id')
        .eq('status', 'pending');

      const { data: scheduledClasses } = await supabase
        .from('classes')
        .select('id')
        .eq('status', 'scheduled');

      const { data: pendingPayments } = await supabase
        .from('invoices')
        .select('id')
        .eq('status', 'pending');

      return {
        activeStudents: activeStudents?.length || 0,
        pendingExams: pendingExams?.length || 0,
        scheduledClasses: scheduledClasses?.length || 0,
        pendingPayments: pendingPayments?.length || 0,
      };
    },
  });

  const stats = [
    {
      title: "Alumnos Activos",
      value: quickStats?.activeStudents || 0,
      trend: "+12%",
      description: "Total de alumnos registrados"
    },
    {
      title: "Pendientes de Examen",
      value: quickStats?.pendingExams || 0,
      trend: "+5%",
      description: "Alumnos por examinar"
    },
    {
      title: "Prácticas Programadas",
      value: quickStats?.scheduledClasses || 0,
      trend: "+8%",
      description: "Para los próximos 7 días"
    },
    {
      title: "Pagos Pendientes",
      value: quickStats?.pendingPayments || 0,
      trend: "-3%",
      description: "Facturas sin pagar"
    }
  ];

  const handleStudentCreated = async () => {
    await loadStudents();
  };

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
            description={stat.description}
          />
        ))}
      </div>

      {/* Student List Section */}
      <Card>
        <CardContent className="p-6">
          <StudentSearch onSearch={setSearchTerm} onStudentCreated={handleStudentCreated} />
          <StudentList searchTerm={searchTerm} />
        </CardContent>
      </Card>
    </div>
  );
}