import { Clock } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

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
    { duration: null, label: "Sin límite de tiempo" },
  ];

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md animate-fade-in backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">Configurar temporizador</AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            Elige un límite de tiempo por pregunta para simular condiciones reales de examen
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          {options.map((option) => (
            <Button
              key={option.duration ?? "unlimited"}
              variant={selectedDuration === option.duration ? "default" : "outline"}
              className="h-auto gap-4 p-6 text-lg transition-all hover:scale-[1.02] hover:shadow-lg"
              onClick={() => {
                onSelectDuration(option.duration);
                onOpenChange(false);
              }}
            >
              <Clock className={`h-5 w-5 ${selectedDuration === option.duration ? "text-primary-foreground" : "text-primary"}`} />
              <span className="flex-1 text-left">{option.label}</span>
              {option.duration && (
                <span className="text-sm opacity-70">por pregunta</span>
              )}
            </Button>
          ))}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}