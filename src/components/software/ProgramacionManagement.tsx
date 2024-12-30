import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Search, Plus, Clock, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Clase {
  id: number;
  tipo: "Teórica" | "Práctica";
  fecha: string;
  hora: string;
  alumno: string;
  profesor: string;
  estado: "Programada" | "Completada" | "Cancelada";
}

const clasesIniciales: Clase[] = [
  {
    id: 1,
    tipo: "Teórica",
    fecha: "2024-03-20",
    hora: "10:00",
    alumno: "Juan Pérez",
    profesor: "María García",
    estado: "Programada"
  },
  {
    id: 2,
    tipo: "Práctica",
    fecha: "2024-03-21",
    hora: "16:30",
    alumno: "Ana López",
    profesor: "Pedro Martínez",
    estado: "Completada"
  }
];

export function ProgramacionManagement() {
  const [clases, setClases] = useState<Clase[]>(clasesIniciales);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const clasesFiltradas = clases.filter(clase =>
    clase.alumno.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clase.profesor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClase = () => {
    toast({
      title: "Función en desarrollo",
      description: "La funcionalidad para añadir clases estará disponible próximamente.",
    });
  };

  const getEstadoColor = (estado: Clase["estado"]) => {
    switch (estado) {
      case "Programada":
        return "bg-blue-100 text-blue-800";
      case "Completada":
        return "bg-green-100 text-green-800";
      case "Cancelada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Programación de Clases</h2>
        </div>
        <Button onClick={handleAddClase} className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Clase
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          className="pl-10"
          placeholder="Buscar por alumno o profesor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clasesFiltradas.map((clase) => (
          <Card key={clase.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  clase.tipo === "Teórica" 
                    ? "bg-purple-100 text-purple-800" 
                    : "bg-orange-100 text-orange-800"
                }`}>
                  {clase.tipo}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{clase.alumno}</h3>
                <p className="text-sm text-gray-600">Profesor: {clase.profesor}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(clase.estado)}`}>
                {clase.estado}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{clase.fecha}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{clase.hora}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}