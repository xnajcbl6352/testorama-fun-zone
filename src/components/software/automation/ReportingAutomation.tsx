import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart, Plus, Settings, History, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ReportingAutomation() {
  const { toast } = useToast();

  const handleCreateReport = () => {
    toast({
      title: "Función en desarrollo",
      description: "Esta funcionalidad estará disponible próximamente.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Automatización de Informes</h2>
        </div>
        <Button onClick={handleCreateReport}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Informe
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informes Programados</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {[
                  "Informe Mensual de Progreso",
                  "Estadísticas de Aprobados",
                  "Uso de Vehículos",
                  "Rendimiento de Instructores"
                ].map((report) => (
                  <div key={report} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <BarChart className="h-4 w-4" />
                      <span>{report}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
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
            <CardTitle>Métricas de Informes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-2 border rounded">
                <span>Informes Generados (Mes)</span>
                <span className="font-semibold">28</span>
              </div>
              <div className="flex justify-between items-center p-2 border rounded">
                <span>Tiempo Medio de Generación</span>
                <span className="font-semibold">45s</span>
              </div>
              <div className="flex justify-between items-center p-2 border rounded">
                <span>Tasa de Entrega</span>
                <span className="font-semibold">100%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}