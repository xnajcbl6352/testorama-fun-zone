import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ReportTypeSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function ReportTypeSelector({ value, onValueChange }: ReportTypeSelectorProps) {
  return (
    <div className="space-y-2">
      <Label>Tipo de Informe</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Seleccionar tipo de informe" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="student-progress">Progreso de Alumnos</SelectItem>
          <SelectItem value="financial">Financiero</SelectItem>
          <SelectItem value="vehicle-usage">Uso de Vehículos</SelectItem>
          <SelectItem value="instructor-performance">Rendimiento de Instructores</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}