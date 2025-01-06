import { ProgramacionManagement } from "@/components/software/ProgramacionManagement";
import { FinancialDashboard } from "@/components/software/financial/FinancialDashboard";
import { InvoiceList } from "@/components/software/invoices/InvoiceList";
import { VehiculosManagement } from "@/components/software/VehiculosManagement";
import { StudentManagement } from "@/components/software/StudentManagement";
import { PaymentManagement } from "@/components/software/payments/PaymentManagement";
import { ReportsDashboard } from "@/components/software/reports/ReportsDashboard";
import { MarketingManagement } from "@/components/software/marketing/MarketingManagement";
import { InstructorPortal } from "@/components/software/instructor/InstructorPortal";
import { 
  Calendar, 
  LayoutDashboard, 
  Receipt, 
  CreditCard, 
  FileBarChart, 
  Files, 
  Car,
  Users,
  ChevronLeft,
  Menu,
  Target,
  ChalkboardTeacher
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar";

export default function SoftwareManagement() {
  const [activeTab, setActiveTab] = useState("students");
  const navigate = useNavigate();

  const menuItems = [
    { id: "students", label: "Alumnos", icon: Users },
    { id: "calendar", label: "Calendario", icon: Calendar },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "invoices", label: "Facturas", icon: Receipt },
    { id: "payments", label: "Pagos", icon: CreditCard },
    { id: "reports", label: "Informes", icon: FileBarChart },
    { id: "documents", label: "Documentos", icon: Files },
    { id: "vehicles", label: "Vehículos", icon: Car },
    { id: "marketing", label: "Marketing", icon: Target },
    { id: "instructor", label: "Portal del Profesor", icon: ChalkboardTeacher },
  ];

  const handleTabChange = (tabId: string) => {
    if (tabId === "documents") {
      navigate("/software/documents");
    } else {
      setActiveTab(tabId);
    }
  };

  const AppSidebar = () => (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <h2 className="text-lg font-semibold text-blue-600">
          Software de Gestión
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => handleTabChange(item.id)}
                isActive={activeTab === item.id}
                tooltip={item.label}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-gray-50/40">
        <AppSidebar />
        <SidebarInset className="flex-1 p-6">
          <div className="container mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold tracking-tight text-blue-600">
                    {menuItems.find(item => item.id === activeTab)?.label}
                  </h1>
                  <p className="text-muted-foreground">
                    Gestiona tu autoescuela de manera eficiente
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              {activeTab === "students" && <StudentManagement />}
              {activeTab === "calendar" && <ProgramacionManagement />}
              {activeTab === "dashboard" && <FinancialDashboard />}
              {activeTab === "invoices" && <InvoiceList />}
              {activeTab === "payments" && <PaymentManagement />}
              {activeTab === "vehicles" && <VehiculosManagement />}
              {activeTab === "marketing" && <MarketingManagement />}
              {activeTab === "instructor" && <InstructorPortal />}
              {activeTab === "reports" && <ReportsDashboard />}
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}