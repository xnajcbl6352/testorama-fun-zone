import { Badge } from "@/components/ui/badge";
import type { RecordStatus } from "@/types/record";

interface RecordStatusBadgeProps {
  status: RecordStatus;
}

const statusConfig: Record<RecordStatus, { label: string; className: string }> = {
  pending: {
    label: "Pendiente",
    className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  },
  in_progress: {
    label: "En Proceso",
    className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  },
  completed: {
    label: "Completado",
    className: "bg-green-100 text-green-800 hover:bg-green-100",
  },
};

export function RecordStatusBadge({ status }: RecordStatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge variant="secondary" className={config.className}>
      {config.label}
    </Badge>
  );
}