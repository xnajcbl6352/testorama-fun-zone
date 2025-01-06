import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ClassManagement } from "./calendar/ClassManagement";
import { ClassScheduler } from "./calendar/ClassScheduler";

export function ProgramacionManagement() {
  return (
    <div className="h-[calc(100vh-12rem)]">
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
  );
}