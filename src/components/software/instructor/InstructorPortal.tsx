import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { InstructorSchedule } from "./InstructorSchedule";
import { StudentEvaluations } from "./StudentEvaluations";
import { RoutePlanning } from "./RoutePlanning";
import { ClassNotes } from "./ClassNotes";
import { AvailabilityManager } from "./AvailabilityManager";
import { Calendar, ClipboardList, MapPin, FileText, Clock } from "lucide-react";

export function InstructorPortal() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Mi Horario
          </TabsTrigger>
          <TabsTrigger value="evaluations" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            Evaluaciones
          </TabsTrigger>
          <TabsTrigger value="routes" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Rutas
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Notas
          </TabsTrigger>
          <TabsTrigger value="availability" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Disponibilidad
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schedule">
          <Card className="p-6">
            <InstructorSchedule />
          </Card>
        </TabsContent>

        <TabsContent value="evaluations">
          <Card className="p-6">
            <StudentEvaluations />
          </Card>
        </TabsContent>

        <TabsContent value="routes">
          <Card className="p-6">
            <RoutePlanning />
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card className="p-6">
            <ClassNotes />
          </Card>
        </TabsContent>

        <TabsContent value="availability">
          <Card className="p-6">
            <AvailabilityManager />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}