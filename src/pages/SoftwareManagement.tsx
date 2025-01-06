import { ProgramacionManagement } from "@/components/software/ProgramacionManagement";
import { FinancialDashboard } from "@/components/software/financial/FinancialDashboard";
import { InvoiceList } from "@/components/software/invoices/InvoiceList";
import { Calendar, LayoutDashboard, Receipt, CreditCard, FileBarChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function SoftwareManagement() {
  const [activeTab, setActiveTab] = useState("calendar");

  const tabs = [
    { id: "calendar", label: "Calendario", icon: Calendar },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "invoices", label: "Facturas", icon: Receipt },
    { id: "payments", label: "Pagos", icon: CreditCard },
    { id: "reports", label: "Informes", icon: FileBarChart },
  ];

  return (
    <div className="min-h-screen bg-gray-50/40">
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-blue-600">
            Software de Gestión
          </h1>
          <p className="text-muted-foreground">
            Gestiona tu autoescuela de manera eficiente
          </p>
        </div>

        <nav className="flex space-x-1 border-b">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors",
                "hover:text-blue-600 relative",
                activeTab === id
                  ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600"
                  : "text-muted-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-6">
          {activeTab === "calendar" && <ProgramacionManagement />}
          {activeTab === "dashboard" && <FinancialDashboard />}
          {activeTab === "invoices" && <InvoiceList />}
          {activeTab === "payments" && (
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-12">
              <div className="flex flex-col items-center justify-center text-center space-y-3">
                <CreditCard className="h-12 w-12 text-muted-foreground/50" />
                <h3 className="text-lg font-semibold">Módulo de pagos</h3>
                <p className="text-muted-foreground text-sm">
                  Esta funcionalidad estará disponible próximamente
                </p>
              </div>
            </div>
          )}
          {activeTab === "reports" && (
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-12">
              <div className="flex flex-col items-center justify-center text-center space-y-3">
                <FileBarChart className="h-12 w-12 text-muted-foreground/50" />
                <h3 className="text-lg font-semibold">Módulo de informes</h3>
                <p className="text-muted-foreground text-sm">
                  Esta funcionalidad estará disponible próximamente
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}