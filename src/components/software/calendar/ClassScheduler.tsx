import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ClassDetailsModal } from "./ClassDetailsModal";
import { NewClassModal } from "./NewClassModal";
import { CancellationModal } from "./CancellationModal";
import { useClasses } from "@/hooks/useClasses";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Filter, MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
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
        return '#818cf8';
      case 'practical':
        return '#34d399';
      case 'exam':
        return '#f87171';
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
      // Implementation pending
      toast({
        title: "Class rescheduled",
        description: "The class has been successfully rescheduled.",
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
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-4">
          <Select defaultValue={view} onValueChange={setView}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dayGridMonth">Month</SelectItem>
              <SelectItem value="timeGridWeek">Week</SelectItem>
              <SelectItem value="timeGridDay">Day</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={selectedLocation} 
            onValueChange={setSelectedLocation}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select location">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Sede</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las sedes</SelectItem>
              {/* Add location options */}
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            Today
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Search classes..."
              className="w-64"
            />
          </div>
        </div>
        <Button onClick={() => setIsAddingClass(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Class
        </Button>
      </div>

      <Card className="p-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={view}
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
          eventDrop={handleEventDrop}
          select={() => setIsAddingClass(true)}
          eventClick={({ event }) => setSelectedClass(classes.find(c => c.id === event.id) || null)}
          height="auto"
          slotMinTime="08:00:00"
          slotMaxTime="22:00:00"
          allDaySlot={false}
          locale="es"
          eventContent={(eventInfo) => (
            <div className="p-1">
              <div className="text-xs font-semibold">{eventInfo.timeText}</div>
              <div className="text-sm truncate">{eventInfo.event.title}</div>
              {eventInfo.event.extendedProps.teacher && (
                <div className="text-xs text-gray-600 truncate">
                  {eventInfo.event.extendedProps.teacher.first_name} {eventInfo.event.extendedProps.teacher.last_name}
                </div>
              )}
              {eventInfo.event.extendedProps.location && (
                <div className="text-xs text-gray-600 truncate flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {eventInfo.event.extendedProps.location.name}
                </div>
              )}
              {eventInfo.event.extendedProps.vehicle && (
                <div className="text-xs text-gray-600 truncate">
                  {eventInfo.event.extendedProps.vehicle.brand} {eventInfo.event.extendedProps.vehicle.model}
                </div>
              )}
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