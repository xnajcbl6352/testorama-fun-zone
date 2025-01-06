import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Tool, Calendar, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

interface VehicleCardProps {
  vehicle: Vehicle;
  onEdit: (id: string) => void;
  onMaintenance: (id: string) => void;
}

export function VehicleCard({ vehicle, onEdit, onMaintenance }: VehicleCardProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const getStatusColor = (status: Vehicle["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "in_use":
        return "bg-blue-100 text-blue-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleMaintenanceClick = async () => {
    setIsLoading(true);
    try {
      await onMaintenance(vehicle.id);
      toast({
        title: "Mantenimiento programado",
        description: `Se ha programado el mantenimiento para el vehículo ${vehicle.plate_number}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo programar el mantenimiento",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">{vehicle.plate_number}</h3>
          <p className="text-sm text-gray-600">
            {vehicle.brand} {vehicle.model}
          </p>
        </div>
        <Badge className={getStatusColor(vehicle.status)}>
          {vehicle.status === "available" ? "Disponible" : 
           vehicle.status === "in_use" ? "En uso" : "Mantenimiento"}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Car className="h-4 w-4" />
          <span>Kilometraje: {vehicle.mileage.toLocaleString()} km</span>
        </div>

        {vehicle.next_maintenance_date && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Próximo mantenimiento: {new Date(vehicle.next_maintenance_date).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <Button variant="outline" size="sm" onClick={() => onEdit(vehicle.id)}>
          Ver detalles
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleMaintenanceClick}
          disabled={isLoading}
        >
          <Tool className="h-4 w-4 mr-2" />
          Mantenimiento
        </Button>
      </div>
    </Card>
  );
}