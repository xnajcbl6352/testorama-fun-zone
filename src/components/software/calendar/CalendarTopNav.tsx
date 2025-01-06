import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Grid, List, MapPin, Plus, Search } from "lucide-react";

interface CalendarTopNavProps {
  view: string;
  onViewChange: (view: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  onAddClass: () => void;
}

export function CalendarTopNav({
  view,
  onViewChange,
  selectedLocation,
  onLocationChange,
  onAddClass
}: CalendarTopNavProps) {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onViewChange('grid')}
            className={view === 'grid' ? 'bg-primary text-white' : ''}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onViewChange('list')}
            className={view === 'list' ? 'bg-primary text-white' : ''}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>

        <Select value={view} onValueChange={onViewChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar vista" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dayGridMonth">Mes</SelectItem>
            <SelectItem value="timeGridWeek">Semana</SelectItem>
            <SelectItem value="timeGridDay">Día</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedLocation} onValueChange={onLocationChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Sede</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las sedes</SelectItem>
            {/* Add location options dynamically */}
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm">
          Hoy
        </Button>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar clases..."
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      <Button onClick={onAddClass}>
        <Plus className="h-4 w-4 mr-2" />
        Nueva Clase
      </Button>
    </div>
  );
}