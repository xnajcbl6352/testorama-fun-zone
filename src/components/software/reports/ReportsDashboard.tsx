import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatisticsOverview } from "./dashboard/StatisticsOverview";
import { ReportGenerationForm } from "./generation/ReportGenerationForm";
import { ChartBar, FileText, Settings } from "lucide-react";

export function ReportsDashboard() {
  return (
    <div className="space-y-6">
      <StatisticsOverview />

      <Tabs defaultValue="generate" className="space-y-4">
        <TabsList>
          <TabsTrigger value="generate" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Generar Informes
          </TabsTrigger>
          <TabsTrigger value="automated" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Informes Automatizados
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <ChartBar className="h-4 w-4" />
            Análisis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generate">
          <div className="grid gap-4 md:grid-cols-2">
            <ReportGenerationForm />
            <GeneratedReportsList />
          </div>
        </TabsContent>

        <TabsContent value="automated">
          <AutomatedReports />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Placeholder components that can be implemented later
function GeneratedReportsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informes Generados</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">No hay informes generados recientemente.</p>
      </CardContent>
    </Card>
  );
}

function AutomatedReports() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informes Automatizados</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Configure informes automáticos para su generación periódica.
        </p>
      </CardContent>
    </Card>
  );
}

function AnalyticsDashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Panel de Análisis</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Visualice tendencias y métricas clave de su autoescuela.
        </p>
      </CardContent>
    </Card>
  );
}