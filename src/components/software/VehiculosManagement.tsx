import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { VehicleCard } from "./vehicles/VehicleCard";
import { FleetOverview } from "./vehicles/FleetOverview";
import { AddVehicleDialog } from "./vehicles/AddVehicleDialog";
import { supabase } from "@/integrations/supabase/client";

interface Vehicle {
  id: string;
  plate_number: string;
  brand: string;
  model: string;
  type: "car" | "motorcycle" | "truck";
  status: "available" | "in_use" | "maintenance";
  next_maintenance_date: string | null;
  mileage: number;
}

export function VehiculosManagement() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*');

      if (error) throw error;

      setVehicles(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los vehículos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const vehiclesFiltrados = vehicles.filter(vehicle =>
    vehicle.plate_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: vehicles.length,
    available: vehicles.filter(v => v.status === "available").length,
    maintenance: vehicles.filter(v => v.status === "maintenance").length,
    reserved: vehicles.filter(v => v.status === "in_use").length,
  };

  const handleEditVehicle = (id: string) => {
    toast({
      title: "Función en desarrollo",
      description: "La funcionalidad para editar vehículos estará disponible próximamente.",
    });
  };

  const handleMaintenance = async (id: string) => {
    try {
      const { error } = await supabase
        .from('vehicles')
        .update({ status: 'maintenance' })
        .eq('id', id);

      if (error) throw error;

      await loadVehicles();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado del vehículo",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Control de Vehículos</h2>
        <AddVehicleDialog onVehicleAdded={loadVehicles} />
      </div>

      <FleetOverview stats={stats} />

      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            className="pl-10"
            placeholder="Buscar por matrícula, marca o modelo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {vehiclesFiltrados.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onEdit={handleEditVehicle}
            onMaintenance={handleMaintenance}
          />
        ))}
      </div>
    </div>
  );
}