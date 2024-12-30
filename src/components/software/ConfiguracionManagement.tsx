import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings, Save, Building, Euro, Clock, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ConfiguracionGeneral {
  nombreAutoescuela: string;
  direccion: string;
  telefono: string;
  email: string;
  horarioApertura: string;
  horarioCierre: string;
}

interface ConfiguracionPrecios {
  matricula: number;
  claseTeoria: number;
  clasePractica: number;
  examenTeorico: number;
  examenPractico: number;
}

export function ConfiguracionManagement() {
  const [configGeneral, setConfigGeneral] = useState<ConfiguracionGeneral>({
    nombreAutoescuela: "Autoescuela Ejemplo",
    direccion: "Calle Principal 123",
    telefono: "912345678",
    email: "info@autoescuela.com",
    horarioApertura: "09:00",
    horarioCierre: "20:00"
  });

  const [configPrecios, setConfigPrecios] = useState<ConfiguracionPrecios>({
    matricula: 150,
    claseTeoria: 30,
    clasePractica: 45,
    examenTeorico: 90,
    examenPractico: 120
  });

  const { toast } = useToast();

  const handleSaveConfig = () => {
    toast({
      title: "Configuración guardada",
      description: "Los cambios han sido guardados correctamente.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Configuración</h2>
        </div>
        <Button onClick={handleSaveConfig} className="gap-2">
          <Save className="h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Información General</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Nombre de la Autoescuela</label>
              <Input
                value={configGeneral.nombreAutoescuela}
                onChange={(e) => setConfigGeneral({...configGeneral, nombreAutoescuela: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Dirección</label>
              <Input
                value={configGeneral.direccion}
                onChange={(e) => setConfigGeneral({...configGeneral, direccion: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Teléfono</label>
              <Input
                value={configGeneral.telefono}
                onChange={(e) => setConfigGeneral({...configGeneral, telefono: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                value={configGeneral.email}
                onChange={(e) => setConfigGeneral({...configGeneral, email: e.target.value})}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Euro className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Precios</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Matrícula</label>
              <Input
                type="number"
                value={configPrecios.matricula}
                onChange={(e) => setConfigPrecios({...configPrecios, matricula: Number(e.target.value)})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Clase de Teoría</label>
              <Input
                type="number"
                value={configPrecios.claseTeoria}
                onChange={(e) => setConfigPrecios({...configPrecios, claseTeoria: Number(e.target.value)})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Clase Práctica</label>
              <Input
                type="number"
                value={configPrecios.clasePractica}
                onChange={(e) => setConfigPrecios({...configPrecios, clasePractica: Number(e.target.value)})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Examen Teórico</label>
              <Input
                type="number"
                value={configPrecios.examenTeorico}
                onChange={(e) => setConfigPrecios({...configPrecios, examenTeorico: Number(e.target.value)})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Examen Práctico</label>
              <Input
                type="number"
                value={configPrecios.examenPractico}
                onChange={(e) => setConfigPrecios({...configPrecios, examenPractico: Number(e.target.value)})}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Horarios</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Hora de Apertura</label>
              <Input
                type="time"
                value={configGeneral.horarioApertura}
                onChange={(e) => setConfigGeneral({...configGeneral, horarioApertura: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Hora de Cierre</label>
              <Input
                type="time"
                value={configGeneral.horarioCierre}
                onChange={(e) => setConfigGeneral({...configGeneral, horarioCierre: e.target.value})}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Configuración de Usuarios</h3>
          </div>
          
          <div className="space-y-4">
            <Button className="w-full" variant="outline">
              Gestionar Roles y Permisos
            </Button>
            <Button className="w-full" variant="outline">
              Configurar Notificaciones
            </Button>
            <Button className="w-full" variant="outline">
              Políticas de Contraseñas
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}