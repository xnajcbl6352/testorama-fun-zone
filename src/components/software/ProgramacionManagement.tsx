import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useSession } from '@supabase/auth-helpers-react';
import { CalendarHeader } from "./calendar/CalendarHeader";
import { CalendarSidebar } from "./calendar/CalendarSidebar";
import { Class } from "@/types/class";
import { useClasses } from "@/hooks/useClasses";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { supabase } from "@/integrations/supabase/client";

export function ProgramacionManagement() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    searchTerm: ''
  });
  const { toast } = useToast();
  const session = useSession();
  const { isLoading, loadClasses } = useClasses();

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('classes-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'classes'
        },
        (payload) => {
          console.log('Real-time update:', payload);
          loadClasses().then(setClasses);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadClasses]);

  useEffect(() => {
    if (session) {
      loadClasses().then(setClasses);
    } else {
      toast({
        title: "Error de autenticación",
        description: "Debes iniciar sesión para ver las clases",
        variant: "destructive",
      });
    }
  }, [session, loadClasses]);

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
      statusIcon: getStatusIcon(classItem.status),
      payment_status: classItem.payment_status,
      route_plan: classItem.route_plan
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
              {eventInfo.event.extendedProps.payment_status === 'pending' && (
                <div className="text-xs text-yellow-500">⚠️ Pago pendiente</div>
              )}
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
              <p><strong>Estado de pago:</strong> {eventInfo.event.extendedProps.payment_status}</p>
              {eventInfo.event.extendedProps.route_plan && (
                <p><strong>Ruta planificada:</strong> Sí</p>
              )}
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
          
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4">
            <CalendarSidebar 
              onAddClass={() => setIsAddingClass(true)}
              onFilterChange={setFilters}
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
          </div>
        </>
      )}
    </div>
  );
}