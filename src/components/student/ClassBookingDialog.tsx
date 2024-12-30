import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ClassBookingDialogProps {
  open: boolean;
  onClose: () => void;
  onBookingComplete: () => void;
}

export function ClassBookingDialog({
  open,
  onClose,
  onBookingComplete,
}: ClassBookingDialogProps) {
  const session = useSession();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isBooking, setIsBooking] = useState(false);

  const handleBookClass = async () => {
    if (!selectedDate || !session?.user?.id) return;

    setIsBooking(true);
    try {
      const { error } = await supabase.from("classes").insert({
        student_id: session.user.id,
        date: selectedDate.toISOString().split("T")[0],
        type: "practical",
        start_time: "10:00",
        end_time: "11:00",
        status: "scheduled",
      });

      if (error) throw error;

      toast({
        title: "Clase reservada",
        description: "Tu clase ha sido reservada correctamente",
      });
      onBookingComplete();
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "No se pudo reservar la clase",
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reservar Clase</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date() || date.getDay() === 0}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              onClick={handleBookClass}
              disabled={!selectedDate || isBooking}
            >
              {isBooking ? "Reservando..." : "Confirmar Reserva"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}