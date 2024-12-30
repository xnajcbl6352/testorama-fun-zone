import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Search, Plus, Send, Phone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Mensaje {
  id: number;
  tipo: "WhatsApp" | "SMS" | "Email";
  destinatario: string;
  asunto: string;
  contenido: string;
  fecha: string;
  estado: "Enviado" | "Pendiente" | "Error";
}

const mensajesIniciales: Mensaje[] = [
  {
    id: 1,
    tipo: "WhatsApp",
    destinatario: "Juan Pérez",
    asunto: "Recordatorio de clase",
    contenido: "Recordatorio: Tienes clase mañana a las 10:00",
    fecha: "2024-03-20",
    estado: "Enviado"
  },
  {
    id: 2,
    tipo: "Email",
    destinatario: "Ana López",
    asunto: "Cambio de horario",
    contenido: "Tu clase ha sido reprogramada para el jueves",
    fecha: "2024-03-21",
    estado: "Pendiente"
  }
];

export function ComunicacionManagement() {
  const [mensajes, setMensajes] = useState<Mensaje[]>(mensajesIniciales);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const mensajesFiltrados = mensajes.filter(mensaje =>
    mensaje.destinatario.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mensaje.asunto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMensaje = () => {
    toast({
      title: "Función en desarrollo",
      description: "La funcionalidad para enviar mensajes estará disponible próximamente.",
    });
  };

  const getEstadoColor = (estado: Mensaje["estado"]) => {
    switch (estado) {
      case "Enviado":
        return "bg-green-100 text-green-800";
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "Error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Comunicaciones</h2>
        </div>
        <Button onClick={handleAddMensaje} className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Mensaje
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          className="pl-10"
          placeholder="Buscar por destinatario o asunto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mensajesFiltrados.map((mensaje) => (
          <Card key={mensaje.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  mensaje.tipo === "WhatsApp" 
                    ? "bg-green-100 text-green-800" 
                    : mensaje.tipo === "SMS"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-purple-100 text-purple-800"
                }`}>
                  {mensaje.tipo}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{mensaje.asunto}</h3>
                <p className="text-sm text-gray-600">Para: {mensaje.destinatario}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(mensaje.estado)}`}>
                {mensaje.estado}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{mensaje.contenido}</p>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>{mensaje.fecha}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}