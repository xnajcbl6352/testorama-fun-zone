import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Car, Search, Plus, Edit, Trash, Calendar, Wrench } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

interface Vehiculo {
  id: number;
  matricula: string;
  marca: string;
  modelo: string;
  tipo: "Coche" | "Moto" | "Camión";
  estado: "Disponible" | "En uso" | "Mantenimiento";
  proximaRevision: string;
  kilometraje: number;
}

const vehiculosIniciales: Vehiculo[] = [
  {
    id: 1,
    matricula: "1234ABC",
    marca: "Toyota",
    modelo: "Yaris",
    tipo: "Coche",
    estado: "Disponible",
    proximaRevision: "2024-06-15",
    kilometraje: 45000
  },
  {
    id: 2,
    matricula: "5678DEF",
    marca: "Honda",
    modelo: "CBR500",
    tipo: "Moto",
    estado: "En uso",
    proximaRevision: "2024-05-20",
    kilometraje: 12000
  },
  {
    id: 3,
    matricula: "9012GHI",
    marca: "Mercedes",
    modelo: "Actros",
    tipo: "Camión",
    estado: "Mantenimiento",
    proximaRevision: "2024-04-10",
    kilometraje: 80000
  }
];

export function VehiculosManagement() {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>(vehiculosIniciales);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const vehiculosFiltrados = vehiculos.filter(vehiculo =>
    vehiculo.matricula.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehiculo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehiculo.modelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddVehiculo = () => {
    toast({
      title: "Función en desarrollo",
      description: "La funcionalidad para añadir vehículos estará disponible próximamente.",
    });
  };

  const handleEditVehiculo = (id: number) => {
    toast({
      title: "Función en desarrollo",
      description: "La funcionalidad para editar vehículos estará disponible próximamente.",
    });
  };

  const handleDeleteVehiculo = (id: number) => {
    toast({
      title: "Función en desarrollo",
      description: "La funcionalidad para eliminar vehículos estará disponible próximamente.",
    });
  };

  const getEstadoColor = (estado: Vehiculo["estado"]) => {
    switch (estado) {
      case "Disponible":
        return "bg-green-100 text-green-800";
      case "En uso":
        return "bg-blue-100 text-blue-800";
      case "Mantenimiento":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Car className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Control de Vehículos</h2>
        </div>
        <Button onClick={handleAddVehiculo} className="gap-2">
          <Plus className="h-4 w-4" />
          Añadir Vehículo
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          className="pl-10"
          placeholder="Buscar por matrícula, marca o modelo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {vehiculosFiltrados.map((vehiculo) => (
          <Card key={vehiculo.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{vehiculo.matricula}</h3>
                <p className="text-sm text-gray-600">
                  {vehiculo.marca} {vehiculo.modelo}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditVehiculo(vehiculo.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteVehiculo(vehiculo.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <Badge variant="secondary">{vehiculo.tipo}</Badge>
              <Badge className={getEstadoColor(vehiculo.estado)}>
                {vehiculo.estado}
              </Badge>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Próxima revisión: {vehiculo.proximaRevision}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Wrench className="h-4 w-4" />
                <span>Kilometraje: {vehiculo.kilometraje.toLocaleString()} km</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}