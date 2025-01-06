import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Database, Plus, Settings, History, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function BackupSystem() {
  const { toast } = useToast();

  const handleCreateBackup = () => {
    toast({
      title: "Función en desarrollo",
      description: "Esta funcionalidad estará disponible próximamente.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Sistema de Copias de Seguridad</h2>
        </div>
        <Button onClick={handleCreateBackup}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Copia
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Copias de Seguridad</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {[
                  "Backup Diario - 2024-03-20",
                  "Backup Semanal - Semana 11",
                  "Backup Mensual - Febrero 2024",
                  "Backup Manual - Pre-actualización"
                ].map((backup) => (
                  <div key={backup} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      <span>{backup}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
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
            <CardTitle>Estado del Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-2 border rounded">
                <span>Última Copia</span>
                <span className="font-semibold">Hace 2 horas</span>
              </div>
              <div className="flex justify-between items-center p-2 border rounded">
                <span>Espacio Utilizado</span>
                <span className="font-semibold">1.2 GB</span>
              </div>
              <div className="flex justify-between items-center p-2 border rounded">
                <span>Estado</span>
                <span className="font-semibold text-green-600">Activo</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}