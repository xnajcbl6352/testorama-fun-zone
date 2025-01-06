import { cn } from "@/lib/utils";
import { Book, Car, GraduationCap } from "lucide-react";
import type { Class } from "@/types/class";

interface ClassCardProps {
  classData: Class;
  onClick: () => void;
}

export function ClassCard({ classData, onClick }: ClassCardProps) {
  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'theoretical':
        return 'bg-[#E3EEFF] border-blue-200';
      case 'practical':
        return 'bg-[#E3FFE6] border-green-200';
      case 'exam':
        return 'bg-[#FFE3D6] border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'theoretical':
        return <Book className="h-4 w-4 text-blue-600" />;
      case 'practical':
        return <Car className="h-4 w-4 text-green-600" />;
      case 'exam':
        return <GraduationCap className="h-4 w-4 text-orange-600" />;
      default:
        return null;
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-2 rounded-md border cursor-pointer hover:shadow-md transition-shadow",
        getBackgroundColor(classData.type)
      )}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium">
          {classData.start_time} - {classData.end_time}
        </span>
        {getTypeIcon(classData.type)}
      </div>
      
      <div className="text-sm font-medium mb-1">
        {classData.student?.first_name} {classData.student?.last_name}
      </div>
      
      <div className="text-xs text-gray-600">
        {classData.teacher?.first_name} {classData.teacher?.last_name}
      </div>
      
      {classData.type === 'practical' && classData.vehicle && (
        <div className="text-xs text-gray-600 flex items-center gap-1 mt-1">
          <Car className="h-3 w-3" />
          {classData.vehicle.brand} {classData.vehicle.model}
        </div>
      )}
    </div>
  );
}