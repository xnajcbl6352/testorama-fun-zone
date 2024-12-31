import { Card, CardContent } from "@/components/ui/card";
import { StatsCard } from "./StatsCard";
import { StudentList } from "./StudentList";
import { RecentActivity } from "./RecentActivity";
import { QuickActions } from "./QuickActions";
import { StudentSearch } from "./StudentSearch";
import { useStudents } from "@/hooks/useStudents";
import { useState } from "react";

export function StudentDashboard() {
  const { students, isLoading } = useStudents();
  const [searchTerm, setSearchTerm] = useState("");

  const stats = [
    {
      title: "Total Students",
      value: students?.length || 0,
      trend: "+12%",
      description: "Total registered students"
    },
    {
      title: "Active Students",
      value: students?.filter(s => s.status === 'active').length || 0,
      trend: "+5%",
      description: "Currently active students"
    },
    {
      title: "Pending Records",
      value: "45",
      trend: "-3%",
      description: "Records pending review"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student List Section */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-6">
              <StudentSearch onSearch={setSearchTerm} />
              <StudentList searchTerm={searchTerm} />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}