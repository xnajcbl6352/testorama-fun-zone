import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  Users, 
  Car, 
  BookOpen, 
  Calendar, 
  MessageSquare,
  Bell,
  BarChart3,
  Shield,
  Settings
} from "lucide-react";
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

const features = [
  {
    icon: Users,
    title: "Gestión de Alumnos",
    description: "Control completo de expedientes y seguimiento"
  },
  {
    icon: Building2,
    title: "Gestión Multisección",
    description: "Administra múltiples sedes eficientemente"
  },
  {
    icon: Car,
    title: "Control de Vehículos",
    description: "Seguimiento de mantenimiento y disponibilidad"
  },
  {
    icon: BookOpen,
    title: "Material Didáctico",
    description: "Recursos educativos digitales"
  },
  {
    icon: Calendar,
    title: "Programación",
    description: "Gestión de clases y exámenes"
  },
  {
    icon: MessageSquare,
    title: "Comunicación",
    description: "WhatsApp y mensajería interna"
  },
  {
    icon: Bell,
    title: "Notificaciones",
    description: "Sistema automatizado de alertas"
  },
  {
    icon: BarChart3,
    title: "Marketing",
    description: "Gestión de promociones y campañas"
  },
  {
    icon: Shield,
    title: "Seguridad",
    description: "Control de accesos y RGPD"
  },
  {
    icon: Settings,
    title: "Configuración",
    description: "Personalización y ajustes"
  }
];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                onClick={() => handleModuleClick(feature.title)}
              >
                <div className="mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
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
            {activeModule === "Gestión Multisección" && <SedesManagement />}
            {activeModule === "Control de Vehículos" && <VehiculosManagement />}
            {activeModule === "Material Didáctico" && <MaterialDidacticoManagement />}
            {activeModule === "Programación" && <ProgramacionManagement />}
            {activeModule === "Comunicación" && <ComunicacionManagement />}
            {activeModule === "Notificaciones" && <NotificacionesManagement />}
            {activeModule === "Marketing" && <MarketingManagement />}
            {activeModule === "Seguridad" && <SeguridadManagement />}
            {activeModule === "Configuración" && <ConfiguracionManagement />}
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