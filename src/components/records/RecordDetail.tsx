import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecordStatusBadge } from "./RecordStatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Record } from "@/types/record";
import { formatDate } from "@/lib/utils";

interface RecordDetailProps {
  record: Record;
  open: boolean;
  onClose: () => void;
  onSubmitToDGT?: (id: string) => void;
}

export function RecordDetail({ record, open, onClose, onSubmitToDGT }: RecordDetailProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] md:w-[750px]">
        <SheetHeader>
          <SheetTitle>Expediente Nº {record.record_number}</SheetTitle>
          <SheetDescription>
            Detalles y estado del expediente
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="details" className="mt-6">
          <TabsList>
            <TabsTrigger value="details">Detalles</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Información General</CardTitle>
                  <RecordStatusBadge status={record.status} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">Alumno</h4>
                  <p>{record.student?.first_name} {record.student?.last_name}</p>
                  <p className="text-sm text-muted-foreground">{record.student?.dni}</p>
                </div>

                <div>
                  <h4 className="font-medium">Fechas</h4>
                  <div className="text-sm">
                    <p><span className="text-muted-foreground">Creado:</span> {formatDate(record.created_at)}</p>
                    {record.dgt_submission_date && (
                      <p><span className="text-muted-foreground">Enviado a DGT:</span> {formatDate(record.dgt_submission_date)}</p>
                    )}
                  </div>
                </div>

                {record.status === 'pending' && onSubmitToDGT && (
                  <Button 
                    className="w-full mt-4"
                    onClick={() => onSubmitToDGT(record.id)}
                  >
                    Enviar a DGT
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Documentos del Expediente</CardTitle>
              </CardHeader>
              <CardContent>
                {record.document_url ? (
                  <div className="flex items-center justify-between">
                    <p>Documento principal</p>
                    <Button variant="outline" size="sm" asChild>
                      <a href={record.document_url} target="_blank" rel="noopener noreferrer">
                        Ver documento
                      </a>
                    </Button>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No hay documentos adjuntos</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Cambios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {record.dgt_submission_date && (
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Enviado a DGT</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(record.dgt_submission_date)}
                        </p>
                      </div>
                      <RecordStatusBadge status="in_progress" />
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Expediente creado</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(record.created_at)}
                      </p>
                    </div>
                    <RecordStatusBadge status="pending" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}