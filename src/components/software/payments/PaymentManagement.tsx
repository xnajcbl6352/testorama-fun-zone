import { useState } from "react";
import { PaymentOverview } from "./PaymentOverview";
import { PaymentDataTable } from "./PaymentDataTable";
import { NewPaymentForm } from "./form/NewPaymentForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PaymentManagement() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="payments">Gestión de Pagos</TabsTrigger>
          <TabsTrigger value="new">Nuevo Pago</TabsTrigger>
          <TabsTrigger value="reports">Informes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <PaymentOverview />
          <PaymentDataTable />
        </TabsContent>

        <TabsContent value="payments">
          <PaymentDataTable />
        </TabsContent>

        <TabsContent value="new">
          <div className="max-w-2xl mx-auto">
            <NewPaymentForm />
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <PaymentOverview />
        </TabsContent>
      </Tabs>
    </div>
  );
}