import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function DGTDocumentGeneration() {
  const { toast } = useToast();
  const [documentType, setDocumentType] = useState("");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Documento generado",
        description: "El documento ha sido generado correctamente",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al generar el documento",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generación de Documentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Tipo de Documento</Label>
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo de documento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solicitud">Solicitud DGT</SelectItem>
                <SelectItem value="certificado">Certificado Médico</SelectItem>
                <SelectItem value="autorizacion">Autorización</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Fecha de Expedición</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Número de Expediente</Label>
              <Input placeholder="DGT-XXXX" />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Descargar Plantilla
            </Button>
            <Button onClick={handleGenerate} disabled={!documentType || generating}>
              <FileText className="h-4 w-4 mr-2" />
              Generar Documento
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}