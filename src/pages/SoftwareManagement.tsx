import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FinancialDashboard } from "@/components/software/financial/FinancialDashboard";
import { InvoiceList } from "@/components/software/invoices/InvoiceList";

export default function SoftwareManagement() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Software de Gestión</h1>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Dashboard</TabsTrigger>
          <TabsTrigger value="invoices">Facturas</TabsTrigger>
          <TabsTrigger value="payments">Pagos</TabsTrigger>
          <TabsTrigger value="reports">Informes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <FinancialDashboard />
        </TabsContent>

        <TabsContent value="invoices">
          <InvoiceList />
        </TabsContent>

        <TabsContent value="payments">
          <div className="text-center text-muted-foreground py-8">
            Módulo de pagos en desarrollo
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <div className="text-center text-muted-foreground py-8">
            Módulo de informes en desarrollo
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}