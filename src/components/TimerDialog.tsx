import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface TimerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectDuration: (duration: number) => void;
}

export function TimerDialog({ open, onOpenChange, onSelectDuration }: TimerDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Configurar Temporizador</AlertDialogTitle>
          <AlertDialogDescription>
            Selecciona el tiempo que deseas tener para cada pregunta.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <button
            className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-primary/20 bg-primary/5 p-4 hover:border-primary/40 hover:bg-primary/10"
            onClick={() => onSelectDuration(30)}
          >
            <span className="text-2xl font-bold text-primary">30s</span>
            <span className="text-sm text-gray-600">Por pregunta</span>
          </button>
          <button
            className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-primary/20 bg-primary/5 p-4 hover:border-primary/40 hover:bg-primary/10"
            onClick={() => onSelectDuration(60)}
          >
            <span className="text-2xl font-bold text-primary">60s</span>
            <span className="text-sm text-gray-600">Por pregunta</span>
          </button>
        </div>
        <AlertDialogFooter className="sm:justify-between">
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => onOpenChange(false)}>
            Continuar sin temporizador
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}