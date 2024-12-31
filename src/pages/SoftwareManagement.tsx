import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FeatureGrid } from "@/components/software/features/FeatureGrid";
import { StudentManagement } from "@/components/software/StudentManagement";
import { SedesManagement } from "@/components/software/SedesManagement";
import { VehiculosManagement } from "@/components/software/VehiculosManagement";
import { MaterialDidacticoManagement } from "@/components/software/MaterialDidacticoManagement";
import { ProgramacionManagement } from "@/components/software/ProgramacionManagement";
import { ComunicacionManagement } from "@/components/software/ComunicacionManagement";
import { NotificacionesManagement } from "@/components/software/NotificacionesManagement";
import { MarketingManagement } from "@/components/software/MarketingManagement";
import { SeguridadManagement } from "@/components/software/SeguridadManagement";
import { ConfiguracionManagement } from "@/components/software/ConfiguracionManagement";
import { FinancialDashboard } from "@/components/software/financial/FinancialDashboard";

export default function SoftwareManagement() {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const handleModuleClick = (title: string) => {
    setActiveModule(title);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Software de Gestión para Autoescuelas
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Una solución completa para la digitalización y automatización de todos los procesos de tu autoescuela
          </p>
        </div>

        {!activeModule ? (
          <FeatureGrid onFeatureSelect={handleModuleClick} />
        ) : (
          <div className="mb-16">
            <Button
              variant="ghost"
              className="mb-6"
              onClick={() => setActiveModule(null)}
            >
              ← Volver al menú
            </Button>
            
            {activeModule === "Gestión de Alumnos" && <StudentManagement />}
            {activeModule === "Gestión Multisede" && <SedesManagement />}
            {activeModule === "Vehículos" && <VehiculosManagement />}
            {activeModule === "Material Didáctico" && <MaterialDidacticoManagement />}
            {activeModule === "Clases y Exámenes" && <ProgramacionManagement />}
            {activeModule === "Mensajería Interna" && <ComunicacionManagement />}
            {activeModule === "Notificaciones" && <NotificacionesManagement />}
            {activeModule === "Marketing" && <MarketingManagement />}
            {activeModule === "Seguridad y RGPD" && <SeguridadManagement />}
            {activeModule === "Control de Acceso" && <ConfiguracionManagement />}
            {activeModule === "Finanzas y Facturación" && <FinancialDashboard />}
          </div>
        )}

        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary text-white hover:bg-primary/90 transition-colors"
            onClick={() => navigate("/")}
          >
            Volver al Inicio
          </Button>
        </div>
      </div>
    </div>
  );
}