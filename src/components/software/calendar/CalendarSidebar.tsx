import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Filter, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CalendarSidebarProps {
  onAddClass: () => void;
  onFilterChange: (filters: any) => void;
}

export function CalendarSidebar({ onAddClass, onFilterChange }: CalendarSidebarProps) {
  return (
    <Card className="p-4 space-y-6">
      <div className="space-y-2">
        <Button onClick={onAddClass} className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Nueva Clase
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <h3 className="font-semibold">Filtros</h3>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Tipo de Clase</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
              Teórica
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
              Práctica
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
              Examen
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Estado</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
              Programada
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
              Completada
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
              Cancelada
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <h3 className="font-semibold">Vista</h3>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            Semana
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Mes
          </Button>
        </div>
      </div>
    </Card>
  );
}