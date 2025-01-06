import { Student } from "@/types/student";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { 
  FileText, 
  Calendar, 
  CreditCard, 
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Clock
} from "lucide-react";

interface StudentDetailsModalProps {
  student: Student | null;
  open: boolean;
  onClose: () => void;
}

export function StudentDetailsModal({ student, open, onClose }: StudentDetailsModalProps) {
  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>
                {student.first_name[0]}
                {student.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">
                {student.first_name} {student.last_name}
              </h2>
              <p className="text-sm text-muted-foreground">
                DNI/NIE: {student.dni}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="info" className="h-full">
          <TabsList>
            <TabsTrigger value="info">
              <FileText className="h-4 w-4 mr-2" />
              Información Personal
            </TabsTrigger>
            <TabsTrigger value="academic">
              <GraduationCap className="h-4 w-4 mr-2" />
              Progreso Académico
            </TabsTrigger>
            <TabsTrigger value="classes">
              <Calendar className="h-4 w-4 mr-2" />
              Historial de Clases
            </TabsTrigger>
            <TabsTrigger value="payments">
              <CreditCard className="h-4 w-4 mr-2" />
              Estado de Pagos
            </TabsTrigger>
            <TabsTrigger value="notes">
              <MessageSquare className="h-4 w-4 mr-2" />
              Notas
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(80vh-12rem)] mt-4">
            <TabsContent value="info" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Datos Personales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                        <p>{student.email || '-'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
                        <p>{student.phone || '-'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Dirección</p>
                        <p>{student.address || '-'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Fecha de Registro</p>
                        <p>{formatDate(student.registration_date || '')}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Documentos Adjuntos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">No hay documentos adjuntos</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="academic">
              <Card>
                <CardHeader>
                  <CardTitle>Progreso del Alumno</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* This will be implemented in a future iteration */}
                  <p className="text-muted-foreground text-sm">
                    Módulo de progreso académico en desarrollo
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="classes">
              <Card>
                <CardHeader>
                  <CardTitle>Historial de Clases</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* This will be implemented in a future iteration */}
                  <p className="text-muted-foreground text-sm">
                    Módulo de historial de clases en desarrollo
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>Estado de Pagos</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* This will be implemented in a future iteration */}
                  <p className="text-muted-foreground text-sm">
                    Módulo de estado de pagos en desarrollo
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>Notas del Profesor</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* This will be implemented in a future iteration */}
                  <p className="text-muted-foreground text-sm">
                    Módulo de notas en desarrollo
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}