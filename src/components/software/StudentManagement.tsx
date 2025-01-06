import { StudentDashboard } from "./students/StudentDashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentList } from "./students/StudentList";
import { StudentSearch } from "./students/StudentSearch";
import { DocumentGenerationPanel } from "./students/documents/DocumentGenerationPanel";
import { GPSTrackingView } from "./students/tracking/GPSTrackingView";
import { CommunicationHub } from "./students/communication/CommunicationHub";
import { FileText, Users, MapPin, MessageSquare, TrendingUp, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function StudentManagement() {
  const [viewType, setViewType] = useState<"grid" | "list">("list");

  return (
    <div className="space-y-6">
      <Tabs defaultValue="list" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Lista de Alumnos
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Documentación
            </TabsTrigger>
            <TabsTrigger value="tracking" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Seguimiento GPS
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Comunicaciones
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Progreso
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Importar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        <TabsContent value="list">
          <Card>
            <CardContent className="p-6">
              <StudentSearch 
                viewType={viewType}
                onViewTypeChange={setViewType}
                onSearch={(term) => console.log(term)} 
                onStudentCreated={() => console.log('created')} 
              />
              <StudentList viewType={viewType} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <DocumentGenerationPanel />
        </TabsContent>

        <TabsContent value="tracking">
          <GPSTrackingView />
        </TabsContent>

        <TabsContent value="communication">
          <CommunicationHub />
        </TabsContent>

        <TabsContent value="progress">
          <StudentDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}