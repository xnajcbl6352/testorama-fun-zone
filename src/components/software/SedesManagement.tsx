import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Building2, Search, Plus, Edit, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Sede {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  responsable: string;
}

const sedesIniciales: Sede[] = [
  {
    id: 1,
    nombre: "Sede Central",
    direccion: "Calle Principal 123",
    telefono: "912345678",
    email: "central@autoescuela.com",
    responsable: "Juan Pérez"
  },
  {
    id: 2,
    nombre: "Sede Norte",
    direccion: "Avenida Norte 45",
    telefono: "913456789",
    email: "norte@autoescuela.com",
    responsable: "Ana García"
  }
];

export function SedesManagement() {
  const [sedes, setSedes] = useState<Sede[]>(sedesIniciales);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const sedesFiltradas = sedes.filter(sede =>
    sede.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sede.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sede.responsable.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSede = () => {
    toast({
      title: "Función en desarrollo",
      description: "La funcionalidad para añadir sedes estará disponible próximamente.",
    });
  };

  const handleEditSede = (id: number) => {
    toast({
      title: "Función en desarrollo",
      description: "La funcionalidad para editar sedes estará disponible próximamente.",
    });
  };

  const handleDeleteSede = (id: number) => {
    toast({
      title: "Función en desarrollo",
      description: "La funcionalidad para eliminar sedes estará disponible próximamente.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Gestión de Sedes</h2>
        </div>
        <Button onClick={handleAddSede} className="gap-2">
          <Plus className="h-4 w-4" />
          Añadir Sede
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          className="pl-10"
          placeholder="Buscar por nombre, dirección o responsable..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sedesFiltradas.map((sede) => (
          <Card key={sede.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{sede.nombre}</h3>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditSede(sede.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteSede(sede.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>{sede.direccion}</p>
              <p>Tel: {sede.telefono}</p>
              <p>{sede.email}</p>
              <p className="text-primary font-medium">
                Responsable: {sede.responsable}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}