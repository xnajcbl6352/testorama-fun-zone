import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface AnalyticsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  trend?: number;
  className?: string;
}

export function AnalyticsCard({ icon: Icon, title, value, trend, className = "" }: AnalyticsCardProps) {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
        </div>
        <Icon className="h-8 w-8 text-muted-foreground/50" />
      </div>
      {trend && (
        <p className="text-xs text-muted-foreground mt-2">
          {trend > 0 ? "+" : ""}{trend}% from last month
        </p>
      )}
    </Card>
  );
}