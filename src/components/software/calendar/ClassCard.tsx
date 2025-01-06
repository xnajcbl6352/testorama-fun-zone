import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock, User, Car } from "lucide-react";
import type { Class } from "@/types/class";

interface ClassCardProps {
  classData: Class;
}

export function ClassCard({ classData }: ClassCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'theoretical':
        return 'bg-blue-50 text-blue-700';
      case 'practical':
        return 'bg-green-50 text-green-700';
      case 'exam':
        return 'bg-orange-50 text-orange-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const getPaymentStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500';
      case 'overdue':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer relative">
      <div className="absolute top-4 right-4 w-2 h-2 rounded-full"
        style={{ backgroundColor: getPaymentStatusColor(classData.payment_status) }}
      />
      
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">
            {classData.start_time} - {classData.end_time}
          </span>
        </div>
        <Badge className={getStatusColor(classData.status)}>
          {classData.status}
        </Badge>
      </div>

      <div className="space-y-3">
        <Badge className={getTypeColor(classData.type)}>
          {classData.type}
        </Badge>

        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            {/* Add student image here if available */}
          </Avatar>
          <div>
            <p className="text-sm font-medium">
              {classData.student?.first_name} {classData.student?.last_name}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <User className="h-4 w-4" />
          <span>
            {classData.teacher?.first_name} {classData.teacher?.last_name}
          </span>
        </div>

        {classData.type === 'practical' && classData.vehicle && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Car className="h-4 w-4" />
            <span>
              {classData.vehicle.brand} {classData.vehicle.model}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}