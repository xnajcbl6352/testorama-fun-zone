import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, Plus, Settings, History, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function DGTIntegration() {
  const { toast } = useToast();

  const handleCreateConnection = () => {
    toast({
      title: "Función en desarrollo",
      description: "Esta funcionalidad estará disponible próximamente.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Integración DGT</h2>
        </div>
        <Button onClick={handleCreateConnection}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Conexión
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Estado de Conexiones</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {[
                  "Sincronización AUES",
                  "Seguimiento de Estado",
                  "Gestión de Errores",
                  "Registro de Auditoría"
                ].map((connection) => (
                  <div key={connection} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <Link className="h-4 w-4" />
                      <span>{connection}</span>
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
            <CardTitle>Métricas de Integración</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-2 border rounded">
                <span>Solicitudes (Hoy)</span>
                <span className="font-semibold">156</span>
              </div>
              <div className="flex justify-between items-center p-2 border rounded">
                <span>Tiempo de Respuesta Medio</span>
                <span className="font-semibold">1.2s</span>
              </div>
              <div className="flex justify-between items-center p-2 border rounded">
                <span>Tasa de Éxito</span>
                <span className="font-semibold">99.8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}