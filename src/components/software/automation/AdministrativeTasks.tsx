import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClipboardList, Plus, Settings, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AdministrativeTasks() {
  const { toast } = useToast();

  const handleCreateTask = () => {
    toast({
      title: "Función en desarrollo",
      description: "Esta funcionalidad estará disponible próximamente.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Tareas Administrativas</h2>
        </div>
        <Button onClick={handleCreateTask}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Tarea
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tareas Programadas</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {[
                  "Recordatorios de Pago",
                  "Renovación de Licencias",
                  "Vencimiento de Documentos",
                  "Mantenimiento Programado"
                ].map((task) => (
                  <div key={task} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <ClipboardList className="h-4 w-4" />
                      <span>{task}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <History className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estado de Tareas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-2 border rounded">
                <span>Tareas Completadas (Hoy)</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center p-2 border rounded">
                <span>Tareas Pendientes</span>
                <span className="font-semibold">5</span>
              </div>
              <div className="flex justify-between items-center p-2 border rounded">
                <span>Tasa de Éxito</span>
                <span className="font-semibold">95%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}