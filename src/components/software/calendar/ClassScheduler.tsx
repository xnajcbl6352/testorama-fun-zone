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
import { ClassCard } from "./ClassCard";
import { format } from "date-fns";

export function ClassScheduler() {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [view, setView] = useState('timeGridWeek');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<{ start: string; end: string } | null>(null);
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
        return '#f87171'; // Red
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
    extendedProps: classItem
  }));

  const handleEventDrop = async ({ event, oldEvent }: any) => {
    try {
      const classData = classes.find(c => c.id === event.id);
      if (!classData) return;

      const newStart = format(event.start, "HH:mm:ss");
      const newEnd = format(event.end, "HH:mm:ss");
      const newDate = format(event.start, "yyyy-MM-dd");

      const { error } = await supabase
        .from('classes')
        .update({
          date: newDate,
          start_time: newStart,
          end_time: newEnd
        })
        .eq('id', event.id);

      if (error) throw error;

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
      // Revert the drag if there's an error
      event.revert();
    }
  };

  const handleSelect = (selectInfo: any) => {
    setSelectedDate({
      start: format(selectInfo.start, "HH:mm:ss"),
      end: format(selectInfo.end, "HH:mm:ss")
    });
    setIsAddingClass(true);
  };

  const handleEventClick = (info: any) => {
    const classData = classes.find(c => c.id === info.event.id);
    if (classData) {
      setSelectedClass(classData);
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
          select={handleSelect}
          eventClick={handleEventClick}
          height="auto"
          slotMinTime="08:00:00"
          slotMaxTime="20:00:00"
          allDaySlot={false}
          locale="es"
          slotDuration="00:30:00"
          snapDuration="00:15:00"
          eventContent={(eventInfo) => (
            <ClassCard
              classData={classes.find(c => c.id === eventInfo.event.id) as Class}
              onClick={() => {
                const classData = classes.find(c => c.id === eventInfo.event.id);
                if (classData) {
                  setSelectedClass(classData);
                }
              }}
            />
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
        onClose={() => {
          setIsAddingClass(false);
          setSelectedDate(null);
        }}
        initialTime={selectedDate}
      />

      <CancellationModal
        classData={selectedClass}
        open={isCancelling}
        onClose={() => setIsCancelling(false)}
      />
    </div>
  );
}