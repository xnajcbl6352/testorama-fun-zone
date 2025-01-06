import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings, CreditCard, Clock, Bell } from "lucide-react";

export function PaymentConfiguration() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Métodos de Pago Aceptados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="tarjeta" defaultChecked />
            <Label htmlFor="tarjeta">Tarjeta de Crédito/Débito</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="efectivo" defaultChecked />
            <Label htmlFor="efectivo">Efectivo</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="transferencia" defaultChecked />
            <Label htmlFor="transferencia">Transferencia Bancaria</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Plazos de Pago
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="plazo-matricula">Plazo para Matrícula (días)</Label>
            <Input
              id="plazo-matricula"
              type="number"
              defaultValue={30}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="plazo-mensualidad">
              Plazo para Mensualidad (días)
            </Label>
            <Input
              id="plazo-mensualidad"
              type="number"
              defaultValue={10}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recordatorios Automáticos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="recordatorio-vencimiento" defaultChecked />
            <Label htmlFor="recordatorio-vencimiento">
              Recordatorio de vencimiento
            </Label>
          </div>
          <div>
            <Label htmlFor="dias-anticipacion">
              Días de anticipación para recordatorio
            </Label>
            <Input
              id="dias-anticipacion"
              type="number"
              defaultValue={3}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Plantillas de Recibos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Información en Recibos</Label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center space-x-2">
                <Switch id="mostrar-logo" defaultChecked />
                <Label htmlFor="mostrar-logo">Mostrar Logo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="mostrar-firma" defaultChecked />
                <Label htmlFor="mostrar-firma">Incluir Firma Digital</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="mostrar-desglose" defaultChecked />
                <Label htmlFor="mostrar-desglose">Mostrar Desglose IVA</Label>
              </div>
            </div>
          </div>
          <Button className="w-full">Personalizar Plantilla</Button>
        </CardContent>
      </Card>
    </div>
  );
}