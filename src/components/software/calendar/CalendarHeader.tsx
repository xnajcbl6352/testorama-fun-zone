import { Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CalendarHeaderProps {
  isAddingClass: boolean;
  setIsAddingClass: (value: boolean) => void;
}

export function CalendarHeader({ isAddingClass, setIsAddingClass }: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Calendar className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Programación de Clases</h2>
      </div>
      <Dialog open={isAddingClass} onOpenChange={setIsAddingClass}>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nueva Clase
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Programar Nueva Clase</DialogTitle>
          </DialogHeader>
          {/* Class creation form will be implemented in the next step */}
        </DialogContent>
      </Dialog>
    </div>
  );
}