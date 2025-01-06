import { Search, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NewStudentModal } from "./NewStudentModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface StudentSearchProps {
  onSearch: (term: string) => void;
  onStudentCreated: () => void;
  viewType: "grid" | "list";
  onViewTypeChange: (type: "grid" | "list") => void;
}

export function StudentSearch({ 
  onSearch, 
  onStudentCreated, 
  viewType,
  onViewTypeChange 
}: StudentSearchProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
    onStudentCreated();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar alumnos..."
              className="pl-10 w-[300px]"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <ToggleGroup type="single" value={viewType} onValueChange={(value) => value && onViewTypeChange(value as "grid" | "list")}>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <Grid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Acciones</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Seleccionar todo</DropdownMenuItem>
              <DropdownMenuItem>Exportar seleccionados</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Dar de baja seleccionados
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={() => setIsModalOpen(true)}>
            Nuevo Alumno
          </Button>
        </div>
      </div>

      <NewStudentModal 
        open={isModalOpen} 
        onClose={handleModalClose} 
      />
    </>
  );
}