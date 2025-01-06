import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Plus, Settings, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function NotificationSystem() {
  const { toast } = useToast();

  const handleCreateTemplate = () => {
    toast({
      title: "Función en desarrollo",
      description: "Esta funcionalidad estará disponible próximamente.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Sistema de Notificaciones</h2>
        </div>
        <Button onClick={handleCreateTemplate}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Plantilla
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Plantillas de Notificación</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {["Recordatorio de Clase", "Vencimiento de Licencia", "Mantenimiento Vehículo"].map((template) => (
                  <div key={template} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      <span>{template}</span>
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
            <CardTitle>Estadísticas de Envío</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-2 border rounded">
                <span>Notificaciones Enviadas (Hoy)</span>
                <span className="font-semibold">45</span>
              </div>
              <div className="flex justify-between items-center p-2 border rounded">
                <span>Tasa de Apertura</span>
                <span className="font-semibold">76%</span>
              </div>
              <div className="flex justify-between items-center p-2 border rounded">
                <span>Tasa de Entrega</span>
                <span className="font-semibold">99.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}