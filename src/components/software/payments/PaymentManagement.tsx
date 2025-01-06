import { useState } from "react";
import { PaymentOverview } from "./PaymentOverview";
import { PaymentDataTable } from "./PaymentDataTable";
import { PaymentActions } from "./PaymentActions";
import { StudentPaymentView } from "./StudentPaymentView";
import { PaymentReports } from "./PaymentReports";
import { PaymentConfiguration } from "./PaymentConfiguration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

export function PaymentManagement() {
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="payments">Gestión de Pagos</TabsTrigger>
          <TabsTrigger value="students">Pagos por Alumno</TabsTrigger>
          <TabsTrigger value="reports">Informes</TabsTrigger>
          <TabsTrigger value="config">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <PaymentOverview />
          <PaymentDataTable />
        </TabsContent>

        <TabsContent value="payments">
          <PaymentActions />
        </TabsContent>

        <TabsContent value="students">
          <StudentPaymentView />
        </TabsContent>

        <TabsContent value="reports">
          <PaymentReports />
        </TabsContent>

        <TabsContent value="config">
          <PaymentConfiguration />
        </TabsContent>
      </Tabs>
    </div>
  );
}