import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AcademicReports } from "./sections/AcademicReports";
import { FinancialReports } from "./sections/FinancialReports";
import { OperationalReports } from "./sections/OperationalReports";
import { CustomReports } from "./sections/CustomReports";
import { BookOpen, DollarSign, Truck, Settings } from "lucide-react";

export function ReportsDashboard() {
  return (
    <Tabs defaultValue="academic" className="space-y-4">
      <TabsList>
        <TabsTrigger value="academic" className="gap-2">
          <BookOpen className="h-4 w-4" />
          Académicos
        </TabsTrigger>
        <TabsTrigger value="financial" className="gap-2">
          <DollarSign className="h-4 w-4" />
          Financieros
        </TabsTrigger>
        <TabsTrigger value="operational" className="gap-2">
          <Truck className="h-4 w-4" />
          Operativos
        </TabsTrigger>
        <TabsTrigger value="custom" className="gap-2">
          <Settings className="h-4 w-4" />
          Personalizados
        </TabsTrigger>
      </TabsList>

      <TabsContent value="academic">
        <AcademicReports />
      </TabsContent>
      <TabsContent value="financial">
        <FinancialReports />
      </TabsContent>
      <TabsContent value="operational">
        <OperationalReports />
      </TabsContent>
      <TabsContent value="custom">
        <CustomReports />
      </TabsContent>
    </Tabs>
  );
}