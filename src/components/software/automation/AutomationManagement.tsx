import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { DocumentProcessing } from "./DocumentProcessing";
import { NotificationSystem } from "./NotificationSystem";
import { AdministrativeTasks } from "./AdministrativeTasks";
import { ReportingAutomation } from "./ReportingAutomation";
import { DGTIntegration } from "./DGTIntegration";
import { BackupSystem } from "./BackupSystem";

export function AutomationManagement() {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="administrative">Tareas Admin</TabsTrigger>
          <TabsTrigger value="reporting">Informes</TabsTrigger>
          <TabsTrigger value="dgt">DGT</TabsTrigger>
          <TabsTrigger value="backup">Copias Seguridad</TabsTrigger>
        </TabsList>

        <TabsContent value="documents">
          <Card className="p-4">
            <DocumentProcessing />
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-4">
            <NotificationSystem />
          </Card>
        </TabsContent>

        <TabsContent value="administrative">
          <Card className="p-4">
            <AdministrativeTasks />
          </Card>
        </TabsContent>

        <TabsContent value="reporting">
          <Card className="p-4">
            <ReportingAutomation />
          </Card>
        </TabsContent>

        <TabsContent value="dgt">
          <Card className="p-4">
            <DGTIntegration />
          </Card>
        </TabsContent>

        <TabsContent value="backup">
          <Card className="p-4">
            <BackupSystem />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}