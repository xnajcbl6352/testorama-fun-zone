import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Plus, Settings, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function DocumentProcessing() {
  const { toast } = useToast();

  const handleCreateAutomation = () => {
    toast({
      title: "Función en desarrollo",
      description: "Esta funcionalidad estará disponible próximamente.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Procesamiento de Documentos</h2>
        </div>
        <Button onClick={handleCreateAutomation}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Automatización
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Automatizaciones Activas</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {["Generación de Contratos", "Procesamiento de Formularios", "Control de Versiones"].map((task) => (
                  <div key={task} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
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
            <CardTitle>Estadísticas de Procesamiento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-2 border rounded">
                <span>Documentos Procesados (Hoy)</span>
                <span className="font-semibold">24</span>
              </div>
              <div className="flex justify-between items-center p-2 border rounded">
                <span>Tiempo Medio de Procesamiento</span>
                <span className="font-semibold">2.3s</span>
              </div>
              <div className="flex justify-between items-center p-2 border rounded">
                <span>Tasa de Éxito</span>
                <span className="font-semibold">98.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}