import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface RecordFormProps {
  studentId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function RecordForm({ studentId, onSuccess, onCancel }: RecordFormProps) {
  const [recordNumber, setRecordNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("records")
        .insert([
          {
            student_id: studentId,
            record_number: recordNumber,
            status: "pending",
          },
        ]);

      if (error) throw error;

      toast({
        title: "Expediente creado",
        description: "Se ha creado el expediente correctamente",
      });
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error al crear expediente",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="recordNumber">Número de Expediente</Label>
        <Input
          id="recordNumber"
          value={recordNumber}
          onChange={(e) => setRecordNumber(e.target.value)}
          placeholder="Ej: EXP-2024-001"
          required
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creando..." : "Crear Expediente"}
        </Button>
      </div>
    </form>
  );
}