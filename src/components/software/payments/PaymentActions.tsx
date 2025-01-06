import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, FileText, Bell, CheckSquare } from "lucide-react";

export function PaymentActions() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Registrar Pago
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Registra un nuevo pago en el sistema
          </p>
        </CardContent>
      </Card>

      <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generar Recibo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Genera recibos de pago para los alumnos
          </p>
        </CardContent>
      </Card>

      <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recordatorios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Envía recordatorios de pago pendiente
          </p>
        </CardContent>
      </Card>

      <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Marcar Pagado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Actualiza el estado de los pagos
          </p>
        </CardContent>
      </Card>
    </div>
  );
}