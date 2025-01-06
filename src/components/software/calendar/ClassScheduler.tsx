import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarHeader } from "./CalendarHeader";
import { CalendarTopNav } from "./CalendarTopNav";
import { ClassDetailsModal } from "./ClassDetailsModal";
import { NewClassModal } from "./NewClassModal";
import { CancellationModal } from "./CancellationModal";
import { useClasses } from "@/hooks/useClasses";
import { supabase } from "@/integrations/supabase/client";
import type { Class } from "@/types/class";

export function ClassScheduler() {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [view, setView] = useState('timeGridWeek');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const { toast } = useToast();
  const { isLoading, loadClasses } = useClasses();
  const [classes, setClasses] = useState<Class[]>([]);

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
    loadClasses().then(setClasses);
  }, [loadClasses]);

  const getEventColor = (type: string) => {
    switch (type) {
      case 'theoretical':
        return '#818cf8'; // Blue
      case 'practical':
        return '#34d399'; // Green
      case 'exam':
        return '#f87171'; // Orange
      default:
        return '#94a3b8';
    }
  };

  const filteredClasses = selectedLocation === 'all' 
    ? classes 
    : classes.filter(c => c.location_id === selectedLocation);

  const calendarEvents = filteredClasses.map(classItem => ({
    id: classItem.id,
    title: `${classItem.type.charAt(0).toUpperCase() + classItem.type.slice(1)} - ${classItem.student?.first_name} ${classItem.student?.last_name}`,
    start: `${classItem.date}T${classItem.start_time}`,
    end: `${classItem.date}T${classItem.end_time}`,
    backgroundColor: getEventColor(classItem.type),
    extendedProps: {
      type: classItem.type,
      status: classItem.status,
      teacher: classItem.teacher,
      student: classItem.student,
      vehicle: classItem.vehicle,
      payment_status: classItem.payment_status,
      route_plan: classItem.route_plan,
      location: classItem.location
    }
  }));

  const handleEventDrop = async ({ event }: any) => {
    try {
      // Implementation pending for drag and drop
      toast({
        title: "Clase reprogramada",
        description: "La clase ha sido reprogramada exitosamente.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <CalendarTopNav 
        view={view}
        onViewChange={setView}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        onAddClass={() => setIsAddingClass(true)}
      />

      <Card className="p-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={view}
          headerToolbar={false}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={calendarEvents}
          eventDrop={handleEventDrop}
          select={() => setIsAddingClass(true)}
          eventClick={({ event }) => setSelectedClass(classes.find(c => c.id === event.id) || null)}
          height="auto"
          slotMinTime="08:00:00"
          slotMaxTime="20:00:00"
          allDaySlot={false}
          locale="es"
          slotDuration="00:30:00"
          snapDuration="00:15:00"
          eventContent={(eventInfo) => (
            <div className="p-1 h-full">
              <div className="text-xs font-semibold">{eventInfo.timeText}</div>
              <div className="text-sm truncate">{eventInfo.event.title}</div>
              {eventInfo.event.extendedProps.teacher && (
                <div className="text-xs text-gray-600 truncate">
                  {eventInfo.event.extendedProps.teacher.first_name} {eventInfo.event.extendedProps.teacher.last_name}
                </div>
              )}
              {eventInfo.event.extendedProps.vehicle && (
                <div className="text-xs text-gray-600 truncate">
                  {eventInfo.event.extendedProps.vehicle.brand} {eventInfo.event.extendedProps.vehicle.model}
                </div>
              )}
              <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-500" />
            </div>
          )}
        />
      </Card>

      <ClassDetailsModal
        classData={selectedClass}
        open={!!selectedClass}
        onClose={() => setSelectedClass(null)}
        onCancel={() => {
          setIsCancelling(true);
          setSelectedClass(null);
        }}
      />

      <NewClassModal
        open={isAddingClass}
        onClose={() => setIsAddingClass(false)}
      />

      <CancellationModal
        classData={selectedClass}
        open={isCancelling}
        onClose={() => setIsCancelling(false)}
      />
    </div>
  );
}