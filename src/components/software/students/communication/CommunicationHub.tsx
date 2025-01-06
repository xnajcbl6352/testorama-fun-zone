import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Phone, Mail, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CommunicationHub() {
  const [selectedChannel, setSelectedChannel] = useState("whatsapp");
  const { toast } = useToast();

  const handleSendMessage = () => {
    toast({
      title: "Mensaje enviado",
      description: "El mensaje ha sido enviado correctamente.",
    });
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Nuevo Mensaje</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                <SelectTrigger>
                  <SelectValue placeholder="Canal de comunicación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar destinatarios" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los alumnos</SelectItem>
                  <SelectItem value="active">Alumnos activos</SelectItem>
                  <SelectItem value="inactive">Alumnos inactivos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Textarea
              placeholder="Escribe tu mensaje aquí..."
              className="min-h-[100px]"
            />

            <div className="flex justify-end">
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4 mr-2" />
                Enviar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plantillas</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {["Recordatorio de clase", "Cambio de horario", "Pago pendiente"].map((template) => (
                  <Button
                    key={template}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {template}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Historial de Comunicaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((message) => (
                  <div
                    key={message}
                    className="flex items-start space-x-4 p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">WhatsApp</Badge>
                          <span className="font-medium">Juan Pérez</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Hace 2 horas
                        </span>
                      </div>
                      <p className="mt-2 text-sm">
                        Recordatorio: Tienes clase mañana a las 10:00
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}