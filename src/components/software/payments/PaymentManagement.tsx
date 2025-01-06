import { useState } from "react";
import { PaymentOverview } from "./PaymentOverview";
import { PaymentDataTable } from "./PaymentDataTable";
import { NewPaymentForm } from "./form/NewPaymentForm";
import { PaymentConfiguration } from "./PaymentConfiguration";
import { PaymentActions } from "./PaymentActions";
import { PaymentReports } from "./PaymentReports";
import { PaymentPlans } from "./plans/PaymentPlans";
import { PackageManagement } from "./packages/PackageManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export function PaymentManagement() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <PaymentActions />
      
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="payments">Gestión de Pagos</TabsTrigger>
          <TabsTrigger value="plans">Planes de Pago</TabsTrigger>
          <TabsTrigger value="packages">Paquetes y Promociones</TabsTrigger>
          <TabsTrigger value="reports">Informes Financieros</TabsTrigger>
          <TabsTrigger value="config">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <PaymentOverview />
          <PaymentDataTable />
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardContent className="p-6">
              <PaymentDataTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans">
          <PaymentPlans />
        </TabsContent>

        <TabsContent value="packages">
          <PackageManagement />
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