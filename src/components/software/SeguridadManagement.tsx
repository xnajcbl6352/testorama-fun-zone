import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, Search, Plus, UserCheck, Lock, FileText, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Acceso {
  id: number;
  usuario: string;
  rol: "Administrador" | "Profesor" | "Secretaría";
  ultimoAcceso: string;
  estado: "Activo" | "Bloqueado";
  permisos: string[];
}

const accesosIniciales: Acceso[] = [
  {
    id: 1,
    usuario: "admin@autoescuela.com",
    rol: "Administrador",
    ultimoAcceso: "2024-03-20 10:30",
    estado: "Activo",
    permisos: ["Gestión total", "Configuración", "Reportes"]
  },
  {
    id: 2,
    usuario: "profesor@autoescuela.com",
    rol: "Profesor",
    ultimoAcceso: "2024-03-20 09:15",
    estado: "Activo",
    permisos: ["Ver alumnos", "Programar clases", "Registrar asistencia"]
  }
];

export function SeguridadManagement() {
  const [accesos, setAccesos] = useState<Acceso[]>(accesosIniciales);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const accesosFiltrados = accesos.filter(acceso =>
    acceso.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
    acceso.rol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAcceso = () => {
    toast({
      title: "Función en desarrollo",
      description: "La funcionalidad para gestionar accesos estará disponible próximamente.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Seguridad y Accesos</h2>
        </div>
        <Button onClick={handleAddAcceso} className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Acceso
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          className="pl-10"
          placeholder="Buscar por usuario o rol..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accesosFiltrados.map((acceso) => (
          <Card key={acceso.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  acceso.rol === "Administrador"
                    ? "bg-red-100 text-red-800"
                    : acceso.rol === "Profesor"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}>
                  {acceso.rol}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{acceso.usuario}</h3>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                acceso.estado === "Activo"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}>
                {acceso.estado}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Último acceso: {acceso.ultimoAcceso}</span>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">Permisos:</div>
                <div className="flex flex-wrap gap-2">
                  {acceso.permisos.map((permiso, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                    >
                      {permiso}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="text-xl font-semibold">Documentación RGPD</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-4 flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <h4 className="font-medium">Política de Privacidad</h4>
              <p className="text-sm text-gray-600">Última actualización: 2024-03-01</p>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-3">
            <Lock className="h-5 w-5 text-primary" />
            <div>
              <h4 className="font-medium">Términos y Condiciones</h4>
              <p className="text-sm text-gray-600">Última actualización: 2024-03-01</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
