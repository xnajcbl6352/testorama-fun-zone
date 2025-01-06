import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Car } from "lucide-react";
import type { Class } from "@/types/class";

interface ClassDetailsModalProps {
  classData: Class | null;
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
}

export function ClassDetailsModal({ classData, open, onClose, onCancel }: ClassDetailsModalProps) {
  if (!classData) return null;

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

  const getPaymentStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detalles de la Clase</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge className={getStatusColor(classData.status)}>
              {classData.status}
            </Badge>
            <Badge className={getPaymentStatusColor(classData.payment_status)}>
              {classData.payment_status || 'pending'}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(classData.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{classData.start_time} - {classData.end_time}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profesor: {classData.teacher?.first_name} {classData.teacher?.last_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Alumno: {classData.student?.first_name} {classData.student?.last_name}</span>
            </div>
            {classData.vehicle && (
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                <span>Vehículo: {classData.vehicle.brand} {classData.vehicle.model}</span>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
            {classData.status !== 'cancelled' && (
              <Button variant="destructive" onClick={onCancel}>
                Cancelar Clase
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}