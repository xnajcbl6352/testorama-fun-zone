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
  Settings,
  Wallet,
  FileText,
  Database,
  Map,
  FileSignature,
  Building,
  ArrowLeftRight,
  Clock,
  Smartphone,
  Phone,
  Send,
  Mail,
  Tag,
  Globe,
  Lock,
  LifeBuoy,
  GraduationCap,
  Video,
  LayoutDashboard,
  CalendarClock,
  Truck
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
import { FinancialDashboard } from "@/components/software/financial/FinancialDashboard";

const features = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    description: "Vista general del sistema"
  },
  {
    icon: Users,
    title: "Gestión de Alumnos",
    description: "Control completo de expedientes y seguimiento"
  },
  {
    icon: FileText,
    title: "Expedientes",
    description: "Gestión de documentación oficial"
  },
  {
    icon: Building2,
    title: "Gestión Multisede",
    description: "Administra múltiples sedes eficientemente"
  },
  {
    icon: Wallet,
    title: "Finanzas y Facturación",
    description: "Control financiero y facturación"
  },
  {
    icon: Database,
    title: "Inventario",
    description: "Gestión de materiales y recursos"
  },
  {
    icon: Car,
    title: "Vehículos",
    description: "Control de flota y mantenimiento"
  },
  {
    icon: Calendar,
    title: "Clases y Exámenes",
    description: "Programación y calendario"
  },
  {
    icon: BookOpen,
    title: "Material Didáctico",
    description: "Recursos educativos digitales"
  },
  {
    icon: BarChart3,
    title: "Evaluaciones",
    description: "Seguimiento del rendimiento"
  },
  {
    icon: Map,
    title: "GPS Tracking",
    description: "Seguimiento de prácticas"
  },
  {
    icon: FileSignature,
    title: "Documentos Digitales",
    description: "Gestión documental y firmas"
  },
  {
    icon: Building,
    title: "Integración DGT",
    description: "Conexión con sistemas oficiales"
  },
  {
    icon: ArrowLeftRight,
    title: "Copias de Seguridad",
    description: "Gestión de backups"
  },
  {
    icon: Clock,
    title: "Automatización",
    description: "Tareas programadas"
  },
  {
    icon: Smartphone,
    title: "App de Alumnos",
    description: "Gestión móvil para alumnos"
  },
  {
    icon: Phone,
    title: "App de Profesores",
    description: "Gestión móvil para profesores"
  },
  {
    icon: Send,
    title: "WhatsApp",
    description: "Integración de mensajería"
  },
  {
    icon: Bell,
    title: "Notificaciones",
    description: "Sistema de alertas"
  },
  {
    icon: MessageSquare,
    title: "Mensajería Interna",
    description: "Comunicación entre usuarios"
  },
  {
    icon: Tag,
    title: "Precios y Promociones",
    description: "Gestión de tarifas"
  },
  {
    icon: BarChart3,
    title: "Marketing",
    description: "Campañas y promociones"
  },
  {
    icon: Globe,
    title: "Generador Web",
    description: "Creación de páginas web"
  },
  {
    icon: Lock,
    title: "Control de Acceso",
    description: "Roles y permisos"
  },
  {
    icon: Shield,
    title: "Seguridad y RGPD",
    description: "Protección de datos"
  },
  {
    icon: LifeBuoy,
    title: "Soporte",
    description: "Sistema de tickets"
  },
  {
    icon: GraduationCap,
    title: "Cursos Especiales",
    description: "CAP, ADR y otros"
  },
  {
    icon: Video,
    title: "Cursos Virtuales",
    description: "Clases en streaming"
  },
  {
    icon: CalendarClock,
    title: "Reservas Avanzadas",
    description: "Sistema de reservas"
  },
  {
    icon: Truck,
    title: "Control de Flota",
    description: "Gestión avanzada de vehículos"
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