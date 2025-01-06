import { StudentDashboard } from "./students/StudentDashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentList } from "./students/StudentList";
import { StudentSearch } from "./students/StudentSearch";
import { FileText, Users, TrendingUp } from "lucide-react";

export function StudentManagement() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Lista de Alumnos
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Seguimiento
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documentación
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardContent className="p-6">
              <StudentSearch onSearch={(term) => console.log(term)} onStudentCreated={() => console.log('created')} />
              <StudentList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <StudentDashboard />
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Documentación de Alumnos</h2>
              {/* This will be implemented in a future iteration */}
              <p className="text-muted-foreground">
                Módulo de gestión de documentación en desarrollo.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}