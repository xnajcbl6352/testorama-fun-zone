import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useSession } from '@supabase/auth-helpers-react';
import { CalendarHeader } from "./CalendarHeader";
import { CalendarSidebar } from "./CalendarSidebar";
import { ClassDetailsModal } from "./ClassDetailsModal";
import { NewClassModal } from "./NewClassModal";
import { CancellationModal } from "./CancellationModal";
import { useClasses } from "@/hooks/useClasses";
import { Class } from "@/types/class";
import { supabase } from "@/integrations/supabase/client";

export function ClassScheduler() {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    searchTerm: ''
  });
  
  const { toast } = useToast();
  const session = useSession();
  const { isLoading, loadClasses } = useClasses();
  const [classes, setClasses] = useState<Class[]>([]);

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
    }
  }, [session, loadClasses]);

  const getEventColor = (type: Class['type']) => {
    switch (type) {
      case 'theoretical':
        return '#818cf8';
      case 'practical':
        return '#34d399';
      case 'exam':
        return '#f87171';
      default:
        return '#94a3b8';
    }
  };

  const handleAddClass = () => {
    setIsAddingClass(true);
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
      payment_status: classItem.payment_status,
      route_plan: classItem.route_plan
    }
  }));

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
            onAddClass={handleAddClass}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4">
            <CalendarSidebar 
              onAddClass={handleAddClass}
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
                select={() => setIsAddingClass(true)}
                eventClick={({ event }) => setSelectedClass(classes.find(c => c.id === event.id) || null)}
                height="auto"
                slotMinTime="07:00:00"
                slotMaxTime="21:00:00"
                allDaySlot={false}
                locale="es"
              />
            </Card>
          </div>

          <NewClassModal 
            open={isAddingClass}
            onClose={() => setIsAddingClass(false)}
          />

          <ClassDetailsModal
            classData={selectedClass}
            open={!!selectedClass}
            onClose={() => setSelectedClass(null)}
            onCancel={() => {
              setIsCancelling(true);
              setSelectedClass(null);
            }}
          />

          <CancellationModal
            classData={selectedClass}
            open={isCancelling}
            onClose={() => setIsCancelling(false)}
          />
        </>
      )}
    </div>
  );
}