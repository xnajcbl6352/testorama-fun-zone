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
import { Progress } from "@/components/ui/progress";
import { FileText, Download, Send, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function DocumentGenerationPanel() {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setProcessing(true);
    // Simulate document generation process
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    setProcessing(false);
    toast({
      title: "Documento generado",
      description: "El documento ha sido generado correctamente.",
    });
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Generación de Documentos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Tipo de Documento</Label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un tipo de documento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dgt">Solicitud DGT</SelectItem>
                <SelectItem value="transfer">Transferencia</SelectItem>
                <SelectItem value="certificate">Certificado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Alumno</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un alumno" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Juan Pérez</SelectItem>
                <SelectItem value="2">María García</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {processing && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-center text-muted-foreground">
                Generando documento... {progress}%
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Vista Previa
            </Button>
            <Button onClick={handleGenerate} disabled={!selectedTemplate || processing}>
              <Send className="h-4 w-4 mr-2" />
              Generar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documentos Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((doc) => (
              <div
                key={doc}
                className="flex items-center justify-between p-2 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="font-medium">Solicitud DGT #{doc}</p>
                    <p className="text-sm text-muted-foreground">
                      Generado hace 2 horas
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}