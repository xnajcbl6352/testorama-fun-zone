import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  type: z.enum(['theoretical', 'practical', 'exam']),
  teacher_id: z.string().min(1, "Selecciona un profesor"),
  student_id: z.string().min(1, "Selecciona un alumno"),
  vehicle_id: z.string().optional(),
  date: z.string(),
  start_time: z.string(),
  end_time: z.string(),
});

interface NewClassModalProps {
  open: boolean;
  onClose: () => void;
}

export function NewClassModal({ open, onClose }: NewClassModalProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Implementation pending
      toast({
        title: "Clase programada",
        description: "La clase se ha programado correctamente",
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
          <DialogTitle>Programar Nueva Clase</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Form fields will be implemented in the next iteration */}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">
                Programar Clase
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}