import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Clock, AlertTriangle, User } from "lucide-react";

export function GPSTrackingView() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card className="h-[600px]">
          <CardHeader>
            <CardTitle>Mapa de Seguimiento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-full bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">
                Mapa en tiempo real (Próximamente)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Detalles de Ruta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Juan Pérez</span>
                </div>
                <Badge>En Progreso</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Duración: 45 min</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Distancia: 12 km</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Incidencias</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-4">
                {[1, 2, 3].map((incident) => (
                  <div
                    key={incident}
                    className="flex items-start space-x-2 p-2 border rounded-lg"
                  >
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Exceso de velocidad</p>
                      <p className="text-sm text-muted-foreground">
                        Hace 5 minutos
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}