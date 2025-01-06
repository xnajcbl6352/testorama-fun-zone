import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReportTypeSelector } from "./ReportTypeSelector";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { useToast } from "@/hooks/use-toast";
import { Download, FileSpreadsheet } from "lucide-react";
import { DateRange } from "react-day-picker";

export function ReportGenerationForm() {
  const [reportType, setReportType] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const { toast } = useToast();

  const handleGenerateReport = () => {
    if (!reportType || !dateRange?.from || !dateRange?.to) {
      toast({
        title: "Error",
        description: "Por favor selecciona el tipo de informe y el rango de fechas",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Generando informe",
      description: "El informe se está generando. Recibirás una notificación cuando esté listo.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generar Nuevo Informe</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ReportTypeSelector value={reportType} onValueChange={setReportType} />
        
        <div className="space-y-2">
          <DatePickerWithRange 
            date={dateRange}
            onDateChange={setDateRange}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleGenerateReport} className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Generar PDF
          </Button>
          <Button onClick={handleGenerateReport} variant="outline" className="flex-1">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Exportar Excel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}