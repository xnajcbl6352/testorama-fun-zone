import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { supabase } from "@/integrations/supabase/client";
import { useSession } from '@supabase/auth-helpers-react';
import { CalendarHeader } from "./calendar/CalendarHeader";
import { CalendarFilters } from "./calendar/CalendarFilters";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Teacher {
  first_name: string;
  last_name: string;
}

interface Student {
  first_name: string;
  last_name: string;
}

interface Vehicle {
  plate_number: string;
  brand: string;
  model: string;
}

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
  created_at?: string;
  updated_at?: string;
  teacher?: Teacher | null;
  student?: Student | null;
  vehicle?: Vehicle | null;
}

export function ProgramacionManagement() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    searchTerm: ''
  });
  const { toast } = useToast();
  const session = useSession();

  useEffect(() => {
    if (session) {
      loadClasses();
    } else {
      toast({
        title: "Error de autenticación",
        description: "Debes iniciar sesión para ver las clases",
        variant: "destructive",
      });
    }
  }, [session]);

  const loadClasses = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('classes')
        .select(`
          *,
          teacher:teacher_id(first_name, last_name),
          student:student_id(first_name, last_name),
          vehicle:vehicle_id(plate_number, brand, model)
        `)
        .order('date', { ascending: true });

      if (error) throw error;

      // Ensure the data matches our Class interface
      const typedClasses: Class[] = (data || []).map(item => ({
        ...item,
        teacher: item.teacher || null,
        student: item.student || null,
        vehicle: item.vehicle || null
      }));

      setClasses(typedClasses);
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

  const getStatusIcon = (status: Class['status']) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'cancelled':
        return '✗';
      default:
        return '⏳';
    }
  };

  const filteredClasses = classes.filter(classItem => {
    const matchesType = !filters.type || classItem.type === filters.type;
    const matchesStatus = !filters.status || classItem.status === filters.status;
    const matchesSearch = !filters.searchTerm || (
      (classItem.student?.first_name + ' ' + classItem.student?.last_name).toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      (classItem.teacher?.first_name + ' ' + classItem.teacher?.last_name).toLowerCase().includes(filters.searchTerm.toLowerCase())
    );
    return matchesType && matchesStatus && matchesSearch;
  });

  const calendarEvents = filteredClasses.map(classItem => ({
    id: classItem.id,
    title: `${classItem.type.charAt(0).toUpperCase() + classItem.type.slice(1)} Class`,
    start: `${classItem.date}T${classItem.start_time}`,
    end: `${classItem.date}T${classItem.end_time}`,
    backgroundColor: getEventColor(classItem.type),
    extendedProps: {
      type: classItem.type,
      status: classItem.status,
      teacher: classItem.teacher,
      student: classItem.student,
      vehicle: classItem.vehicle,
      statusIcon: getStatusIcon(classItem.status)
    }
  }));

  const handleDateSelect = (selectInfo: any) => {
    if (!session) {
      toast({
        title: "Error de autenticación",
        description: "Debes iniciar sesión para programar clases",
        variant: "destructive",
      });
      return;
    }
    setIsAddingClass(true);
  };

  const handleEventClick = (clickInfo: any) => {
    const event = clickInfo.event;
    toast({
      title: "Clase seleccionada",
      description: `${event.title} - ${event.extendedProps.student?.first_name} ${event.extendedProps.student?.last_name}`,
    });
  };

  const eventContent = (eventInfo: any) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full h-full p-1">
              <div className="font-semibold">{eventInfo.event.title}</div>
              <div className="text-xs">
                {eventInfo.event.extendedProps.statusIcon} {' '}
                {eventInfo.event.extendedProps.student?.first_name} {eventInfo.event.extendedProps.student?.last_name}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p><strong>Instructor:</strong> {eventInfo.event.extendedProps.teacher?.first_name} {eventInfo.event.extendedProps.teacher?.last_name}</p>
              <p><strong>Estudiante:</strong> {eventInfo.event.extendedProps.student?.first_name} {eventInfo.event.extendedProps.student?.last_name}</p>
              {eventInfo.event.extendedProps.vehicle && (
                <p><strong>Vehículo:</strong> {eventInfo.event.extendedProps.vehicle.brand} {eventInfo.event.extendedProps.vehicle.model}</p>
              )}
              <p><strong>Estado:</strong> {eventInfo.event.extendedProps.status}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className="space-y-6">
      {!session ? (
        <div className="text-center py-8">
          <h3 className="text-lg font-semibold">Inicia sesión para ver el calendario</h3>
        </div>
      ) : (
        <>
          <CalendarHeader 
            isAddingClass={isAddingClass}
            setIsAddingClass={setIsAddingClass}
          />
          
          <CalendarFilters 
            filters={filters}
            setFilters={setFilters}
          />

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
              eventContent={eventContent}
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
        </>
      )}
    </div>
  );
}
