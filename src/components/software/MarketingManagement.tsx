import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BarChart3, Search, Plus, Target, Users, TrendingUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Campana {
  id: number;
  nombre: string;
  tipo: "Email" | "SMS" | "Redes Sociales" | "Google Ads";
  objetivo: string;
  fechaInicio: string;
  fechaFin: string;
  estado: "Activa" | "Pausada" | "Finalizada";
  resultados: {
    alcance: number;
    conversiones: number;
    ctr: string;
  };
}

const campanasIniciales: Campana[] = [
  {
    id: 1,
    nombre: "Promoción Primavera",
    tipo: "Email",
    objetivo: "Captación de nuevos alumnos",
    fechaInicio: "2024-03-01",
    fechaFin: "2024-03-31",
    estado: "Activa",
    resultados: {
      alcance: 1500,
      conversiones: 45,
      ctr: "3%"
    }
  },
  {
    id: 2,
    nombre: "Campaña Google Ads",
    tipo: "Google Ads",
    objetivo: "Aumentar visibilidad",
    fechaInicio: "2024-03-15",
    fechaFin: "2024-04-15",
    estado: "Activa",
    resultados: {
      alcance: 5000,
      conversiones: 120,
      ctr: "2.4%"
    }
  }
];

export function MarketingManagement() {
  const [campanas, setCampanas] = useState<Campana[]>(campanasIniciales);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const campanasFiltradas = campanas.filter(campana =>
    campana.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campana.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCampana = () => {
    toast({
      title: "Función en desarrollo",
      description: "La funcionalidad para crear campañas estará disponible próximamente.",
    });
  };

  const getEstadoColor = (estado: Campana["estado"]) => {
    switch (estado) {
      case "Activa":
        return "bg-green-100 text-green-800";
      case "Pausada":
        return "bg-yellow-100 text-yellow-800";
      case "Finalizada":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Marketing y Campañas</h2>
        </div>
        <Button onClick={handleAddCampana} className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Campaña
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          className="pl-10"
          placeholder="Buscar campañas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {campanasFiltradas.map((campana) => (
          <Card key={campana.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  campana.tipo === "Email" 
                    ? "bg-blue-100 text-blue-800"
                    : campana.tipo === "SMS"
                    ? "bg-green-100 text-green-800"
                    : campana.tipo === "Redes Sociales"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-orange-100 text-orange-800"
                }`}>
                  {campana.tipo}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{campana.nombre}</h3>
                <p className="text-sm text-gray-600">{campana.objetivo}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(campana.estado)}`}>
                {campana.estado}
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{campana.fechaInicio} - {campana.fechaFin}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-gray-50 rounded-lg p-3">
              <div className="text-center">
                <Users className="h-4 w-4 mx-auto mb-1 text-gray-600" />
                <div className="text-sm font-medium">{campana.resultados.alcance}</div>
                <div className="text-xs text-gray-500">Alcance</div>
              </div>
              <div className="text-center">
                <Target className="h-4 w-4 mx-auto mb-1 text-gray-600" />
                <div className="text-sm font-medium">{campana.resultados.conversiones}</div>
                <div className="text-xs text-gray-500">Conversiones</div>
              </div>
              <div className="text-center">
                <TrendingUp className="h-4 w-4 mx-auto mb-1 text-gray-600" />
                <div className="text-sm font-medium">{campana.resultados.ctr}</div>
                <div className="text-xs text-gray-500">CTR</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}