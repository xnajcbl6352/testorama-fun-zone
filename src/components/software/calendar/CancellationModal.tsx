import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Class } from "@/types/class";

interface CancellationModalProps {
  classData: Class | null;
  open: boolean;
  onClose: () => void;
}

export function CancellationModal({ classData, open, onClose }: CancellationModalProps) {
  const [reason, setReason] = useState("");
  const { toast } = useToast();

  if (!classData) return null;

  const handleCancellation = async () => {
    try {
      // Implementation pending
      toast({
        title: "Clase cancelada",
        description: "La clase se ha cancelado correctamente",
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cancelar Clase</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Por favor, indica el motivo de la cancelación:
          </p>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Motivo de la cancelación..."
            className="min-h-[100px]"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleCancellation}
              disabled={!reason.trim()}
            >
              Confirmar Cancelación
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}