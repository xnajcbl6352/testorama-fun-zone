import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FiltersState {
  type: string;
  status: string;
  searchTerm: string;
}

interface CalendarFiltersProps {
  filters: FiltersState;
  setFilters: (filters: FiltersState) => void;
}

export function CalendarFilters({ filters, setFilters }: CalendarFiltersProps) {
  return (
    <div className="flex gap-4 flex-wrap">
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por alumno o instructor..."
            value={filters.searchTerm}
            onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
            className="pl-10"
          />
        </div>
      </div>
      <Select
        value={filters.type}
        onValueChange={(value) => setFilters({ ...filters, type: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tipo de clase" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Todos los tipos</SelectItem>
          <SelectItem value="theoretical">Teórica</SelectItem>
          <SelectItem value="practical">Práctica</SelectItem>
          <SelectItem value="exam">Examen</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={filters.status}
        onValueChange={(value) => setFilters({ ...filters, status: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Todos los estados</SelectItem>
          <SelectItem value="scheduled">Programada</SelectItem>
          <SelectItem value="completed">Completada</SelectItem>
          <SelectItem value="cancelled">Cancelada</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}