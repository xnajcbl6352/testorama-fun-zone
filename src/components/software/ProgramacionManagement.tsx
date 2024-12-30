import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Search, Plus, Clock, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

interface Class {
  id: string;
  type: "theoretical" | "practical" | "exam";
  teacher_id: string;
  student_id: string;
  vehicle_id?: string;
  date: string;
  start_time: string;
  end_time: string;
  status: "scheduled" | "completed" | "cancelled";
  attendance_marked: boolean;
  notes?: string;
}

export function ProgramacionManagement() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingClass, setIsAddingClass] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;

      setClasses(data || []);
    } catch (error: any) {
      toast({
        title: "Error al cargar clases",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getEventColor = (type: Class['type']) => {
    switch (type) {
      case 'theoretical':
        return '#818cf8'; // indigo-400
      case 'practical':
        return '#34d399'; // emerald-400
      case 'exam':
        return '#f87171'; // red-400
      default:
        return '#94a3b8'; // slate-400
    }
  };

  const calendarEvents = classes.map(classItem => ({
    id: classItem.id,
    title: `${classItem.type.charAt(0).toUpperCase() + classItem.type.slice(1)} Class`,
    start: `${classItem.date}T${classItem.start_time}`,
    end: `${classItem.date}T${classItem.end_time}`,
    backgroundColor: getEventColor(classItem.type),
    extendedProps: {
      type: classItem.type,
      status: classItem.status,
    }
  }));

  const handleDateSelect = (selectInfo: any) => {
    setIsAddingClass(true);
    // We'll implement the class creation dialog in the next step
  };

  const handleEventClick = (clickInfo: any) => {
    // We'll implement the class details/edit dialog in the next step
    toast({
      title: "Clase seleccionada",
      description: `Has seleccionado la clase ${clickInfo.event.title}`,
    });
  };

  return (
    <div className="space-y-6">
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
            {/* We'll implement the class creation form in the next step */}
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={calendarEvents}
          select={handleDateSelect}
          eventClick={handleEventClick}
          height="auto"
          slotMinTime="07:00:00"
          slotMaxTime="21:00:00"
          allDaySlot={false}
          locale="es"
          buttonText={{
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día'
          }}
        />
      </Card>
    </div>
  );
}