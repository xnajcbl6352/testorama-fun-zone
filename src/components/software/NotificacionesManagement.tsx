import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Search, Plus, AlertCircle, CheckCircle, calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Notificacion {
  id: number;
  tipo: "Alerta" | "Recordatorio" | "Sistema";
  titulo: string;
  mensaje: string;
  fecha: string;
  prioridad: "Alta" | "Media" | "Baja";
  leida: boolean;
}

const notificacionesIniciales: Notificacion[] = [
  {
    id: 1,
    tipo: "Alerta",
    titulo: "Vehículo requiere mantenimiento",
    mensaje: "El vehículo matrícula 1234ABC necesita revisión",
    fecha: "2024-03-20",
    prioridad: "Alta",
    leida: false
  },
  {
    id: 2,
    tipo: "Recordatorio",
    titulo: "Renovación de licencia",
    mensaje: "3 alumnos deben renovar su licencia esta semana",
    fecha: "2024-03-21",
    prioridad: "Media",
    leida: true
  }
];

export function NotificacionesManagement() {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>(notificacionesIniciales);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const notificacionesFiltradas = notificaciones.filter(notificacion =>
    notificacion.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notificacion.mensaje.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNotificacion = () => {
    toast({
      title: "Función en desarrollo",
      description: "La funcionalidad para crear notificaciones estará disponible próximamente.",
    });
  };

  const getPrioridadColor = (prioridad: Notificacion["prioridad"]) => {
    switch (prioridad) {
      case "Alta":
        return "bg-red-100 text-red-800";
      case "Media":
        return "bg-yellow-100 text-yellow-800";
      case "Baja":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Centro de Notificaciones</h2>
        </div>
        <Button onClick={handleAddNotificacion} className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Notificación
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          className="pl-10"
          placeholder="Buscar notificaciones..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notificacionesFiltradas.map((notificacion) => (
          <Card key={notificacion.id} className={`p-6 ${!notificacion.leida ? 'border-l-4 border-l-primary' : ''}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioridadColor(notificacion.prioridad)}`}>
                    {notificacion.prioridad}
                  </span>
                  <span className="text-xs text-gray-500">{notificacion.tipo}</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold">{notificacion.titulo}</h3>
              </div>
              {notificacion.leida ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-primary" />
              )}
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{notificacion.mensaje}</p>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <calendar className="h-4 w-4" />
              <span>{notificacion.fecha}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}