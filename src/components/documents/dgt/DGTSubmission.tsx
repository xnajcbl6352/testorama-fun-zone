import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";

export function DGTSubmission() {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [recordType, setRecordType] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      const { data, error } = await supabase
        .from('records')
        .insert({
          student_id: selectedStudent,
          record_number: `DGT-${Date.now()}`,
          status: 'pending',
          creation_date: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Expediente enviado",
        description: "El expediente ha sido enviado correctamente a la DGT",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error al enviar el expediente",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Presentación Electrónica DGT</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="student">Alumno</Label>
            <Select value={selectedStudent} onValueChange={setSelectedStudent}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar alumno" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Juan Pérez</SelectItem>
                <SelectItem value="2">María García</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Trámite</Label>
            <Select value={recordType} onValueChange={setRecordType}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="license">Licencia</SelectItem>
                <SelectItem value="renewal">Renovación</SelectItem>
                <SelectItem value="duplicate">Duplicado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Documentos</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Arrastra y suelta archivos aquí o
              </p>
              <Button variant="secondary" size="sm">
                Seleccionar archivos
              </Button>
            </div>
          </div>

          {uploading && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-center text-muted-foreground">
                Enviando expediente... {progress}%
              </p>
            </div>
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={uploading || !selectedStudent || !recordType}>
              <FileText className="h-4 w-4 mr-2" />
              Enviar a DGT
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}