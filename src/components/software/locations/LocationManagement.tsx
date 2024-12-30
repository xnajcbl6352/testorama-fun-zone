import { useState } from "react";
import { Building2Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LocationForm } from "./locations/LocationForm";
import { LocationList, type Location } from "./locations/LocationList";
import { useToast } from "@/components/ui/use-toast";

export function LocationManagement() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // TODO: Implement search functionality with Supabase
  };

  const handleSubmit = async (values: any) => {
    // TODO: Implement create/update functionality with Supabase
    console.log("Form values:", values);
    toast({
      title: "Sede creada correctamente",
      description: "La nueva sede ha sido registrada en el sistema",
    });
    setIsDialogOpen(false);
  };

  const handleEdit = (id: string) => {
    // TODO: Implement edit functionality
    console.log("Edit location:", id);
  };

  const handleDelete = (id: string) => {
    // TODO: Implement delete functionality
    console.log("Delete location:", id);
  };

  const handleManageUsers = (id: string) => {
    // TODO: Implement user management functionality
    console.log("Manage users for location:", id);
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Sedes</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Building2Plus className="h-4 w-4" />
              Nueva Sede
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Registrar Nueva Sede</DialogTitle>
            </DialogHeader>
            <LocationForm onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por nombre o dirección..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <LocationList
        locations={locations}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onManageUsers={handleManageUsers}
      />
    </div>
  );
}