import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Filter, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface CalendarSidebarProps {
  onAddClass: () => void;
  onFilterChange: (filters: any) => void;
}

export function CalendarSidebar({ onAddClass, onFilterChange }: CalendarSidebarProps) {
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleTypeSelect = (type: string) => {
    const newType = selectedType === type ? '' : type;
    setSelectedType(newType);
    onFilterChange({ type: newType, status: selectedStatus, searchTerm });
  };

  const handleStatusSelect = (status: string) => {
    const newStatus = selectedStatus === status ? '' : status;
    setSelectedStatus(newStatus);
    onFilterChange({ type: selectedType, status: newStatus, searchTerm });
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    onFilterChange({ type: selectedType, status: selectedStatus, searchTerm: term });
  };

  return (
    <Card className="p-4 space-y-6">
      <div className="space-y-2">
        <Button onClick={onAddClass} className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Nueva Clase
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Buscar</Label>
          <Input
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <h3 className="font-semibold">Filtros</h3>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Tipo de Clase</h4>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={selectedType === 'theoretical' ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => handleTypeSelect('theoretical')}
              >
                Teórica
              </Badge>
              <Badge 
                variant={selectedType === 'practical' ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => handleTypeSelect('practical')}
              >
                Práctica
              </Badge>
              <Badge 
                variant={selectedType === 'exam' ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => handleTypeSelect('exam')}
              >
                Examen
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Estado</h4>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={selectedStatus === 'scheduled' ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => handleStatusSelect('scheduled')}
              >
                Programada
              </Badge>
              <Badge 
                variant={selectedStatus === 'completed' ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => handleStatusSelect('completed')}
              >
                Completada
              </Badge>
              <Badge 
                variant={selectedStatus === 'cancelled' ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => handleStatusSelect('cancelled')}
              >
                Cancelada
              </Badge>
            </div>
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