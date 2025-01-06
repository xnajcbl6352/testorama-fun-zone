import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ClassManagement } from "./calendar/ClassManagement";
import { ClassScheduler } from "./calendar/ClassScheduler";
import { SedesManagement } from "./SedesManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export function ProgramacionManagement() {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="calendar" className="w-full">
        <TabsList>
          <TabsTrigger value="calendar">Calendario</TabsTrigger>
          <TabsTrigger value="locations">Gestión de Sedes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar">
          <div className="h-[calc(100vh-16rem)]">
            <ResizablePanelGroup
              direction="horizontal"
              className="min-h-full rounded-lg border"
            >
              <ResizablePanel defaultSize={40} minSize={30}>
                <div className="h-full p-4 bg-white">
                  <ClassManagement />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={60} minSize={30}>
                <div className="h-full p-4 bg-white">
                  <ClassScheduler />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </TabsContent>

        <TabsContent value="locations">
          <Card className="p-4">
            <SedesManagement />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}