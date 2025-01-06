import { Card } from "@/components/ui/card";
import { Car, Wrench, Clock, CheckCircle } from "lucide-react";

interface FleetStats {
  total: number;
  available: number;
  maintenance: number;
  reserved: number;
}

interface FleetOverviewProps {
  stats: FleetStats;
}

export function FleetOverview({ stats }: FleetOverviewProps) {
  const statCards = [
    {
      title: "Total Vehículos",
      value: stats.total,
      icon: Car,
      color: "text-blue-600",
    },
    {
      title: "Disponibles",
      value: stats.available,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "En Mantenimiento",
      value: stats.maintenance,
      icon: Wrench,
      color: "text-yellow-600",
    },
    {
      title: "Reservados",
      value: stats.reserved,
      icon: Clock,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => (
        <Card key={stat.title} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <stat.icon className={`h-8 w-8 ${stat.color}`} />
          </div>
        </Card>
      ))}
    </div>
  );
}