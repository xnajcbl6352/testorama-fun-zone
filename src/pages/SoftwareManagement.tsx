import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FinancialDashboard } from "@/components/software/financial/FinancialDashboard";
import { InvoiceList } from "@/components/software/invoices/InvoiceList";
import { ProgramacionManagement } from "@/components/software/ProgramacionManagement";
import { LayoutDashboard, Receipt, CreditCard, FileBarChart, Calendar } from "lucide-react";

export default function SoftwareManagement() {
  return (
    <div className="min-h-screen bg-gray-50/40">
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Software de Gestión
          </h1>
          <p className="text-muted-foreground">
            Gestiona tu autoescuela de manera eficiente
          </p>
        </div>
        
        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendario
            </TabsTrigger>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              Facturas
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Pagos
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileBarChart className="h-4 w-4" />
              Informes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            <ProgramacionManagement />
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <FinancialDashboard />
          </TabsContent>

          <TabsContent value="invoices">
            <InvoiceList />
          </TabsContent>

          <TabsContent value="payments">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-12">
              <div className="flex flex-col items-center justify-center text-center space-y-3">
                <CreditCard className="h-12 w-12 text-muted-foreground/50" />
                <h3 className="text-lg font-semibold">Módulo de pagos</h3>
                <p className="text-muted-foreground text-sm">
                  Esta funcionalidad estará disponible próximamente
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-12">
              <div className="flex flex-col items-center justify-center text-center space-y-3">
                <FileBarChart className="h-12 w-12 text-muted-foreground/50" />
                <h3 className="text-lg font-semibold">Módulo de informes</h3>
                <p className="text-muted-foreground text-sm">
                  Esta funcionalidad estará disponible próximamente
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}