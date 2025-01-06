import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AddVehicleDialogProps {
  onVehicleAdded: () => void;
}

export function AddVehicleDialog({ onVehicleAdded }: AddVehicleDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    plate_number: "",
    brand: "",
    model: "",
    type: "car" as "car" | "motorcycle" | "truck",
    mileage: "0",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from("vehicles").insert([
        {
          ...formData,
          mileage: parseInt(formData.mileage),
          status: "available",
        },
      ]);

      if (error) throw error;

      toast({
        title: "Vehículo añadido",
        description: "El vehículo se ha añadido correctamente a la flota",
      });

      setOpen(false);
      onVehicleAdded();
      setFormData({
        plate_number: "",
        brand: "",
        model: "",
        type: "car",
        mileage: "0",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo añadir el vehículo",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Añadir Vehículo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Añadir nuevo vehículo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="plate_number" className="text-sm font-medium">
              Matrícula
            </label>
            <Input
              id="plate_number"
              value={formData.plate_number}
              onChange={(e) =>
                setFormData({ ...formData, plate_number: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="brand" className="text-sm font-medium">
              Marca
            </label>
            <Input
              id="brand"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="model" className="text-sm font-medium">
              Modelo
            </label>
            <Input
              id="model"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium">
              Tipo
            </label>
            <Select
              value={formData.type}
              onValueChange={(value: "car" | "motorcycle" | "truck") =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="car">Coche</SelectItem>
                <SelectItem value="motorcycle">Moto</SelectItem>
                <SelectItem value="truck">Camión</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="mileage" className="text-sm font-medium">
              Kilometraje
            </label>
            <Input
              id="mileage"
              type="number"
              value={formData.mileage}
              onChange={(e) =>
                setFormData({ ...formData, mileage: e.target.value })
              }
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Añadiendo..." : "Añadir vehículo"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}