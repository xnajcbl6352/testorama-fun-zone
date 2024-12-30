import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface TimerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectDuration: (duration: number | null) => void;
  selectedDuration?: number | null;
}

export function TimerDialog({
  open,
  onOpenChange,
  onSelectDuration,
  selectedDuration,
}: TimerDialogProps) {
  const options = [
    { duration: 30, label: "30 segundos" },
    { duration: 60, label: "60 segundos" },
    { duration: null, label: "Sin límite" },
  ];

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Configurar temporizador</AlertDialogTitle>
          <AlertDialogDescription>
            Selecciona el tiempo que deseas tener para cada pregunta
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4">
          {options.map((option) => (
            <Button
              key={option.duration ?? "unlimited"}
              variant={selectedDuration === option.duration ? "default" : "outline"}
              className="h-auto gap-4 p-4"
              onClick={() => {
                onSelectDuration(option.duration);
                onOpenChange(false);
              }}
            >
              <Clock className="h-5 w-5" />
              <span className="flex-1 text-left">{option.label}</span>
              {option.duration && (
                <span className="text-sm text-gray-500">por pregunta</span>
              )}
            </Button>
          ))}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}