import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  type: z.enum(['theoretical', 'practical', 'exam']),
  teacher_id: z.string().min(1, "Selecciona un profesor"),
  student_id: z.string().min(1, "Selecciona un alumno"),
  vehicle_id: z.string().optional(),
  location_id: z.string().min(1, "Selecciona una sede"),
  date: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  notes: z.string().optional(),
  payment_status: z.enum(['pending', 'paid', 'overdue']).optional(),
  recurrence: z.object({
    enabled: z.boolean(),
    frequency: z.enum(['daily', 'weekly', 'monthly']).optional(),
    until: z.string().optional(),
  }).optional(),
  waiting_list: z.boolean().optional(),
  auto_assign_vehicle: z.boolean().optional(),
  auto_assign_instructor: z.boolean().optional(),
});

interface NewClassModalProps {
  open: boolean;
  onClose: () => void;
}

export function NewClassModal({ open, onClose }: NewClassModalProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recurrence: {
        enabled: false,
      },
      waiting_list: false,
      auto_assign_vehicle: false,
      auto_assign_instructor: false,
    },
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Programar Nueva Clase</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de Clase</label>
                <Select
                  name="type"
                  onValueChange={(value) => form.setValue('type', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="theoretical">Teórica</SelectItem>
                    <SelectItem value="practical">Práctica</SelectItem>
                    <SelectItem value="exam">Examen</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Sede</label>
                <Select
                  name="location_id"
                  onValueChange={(value) => form.setValue('location_id', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona sede" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Add location options */}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Alumno</label>
                <Select
                  name="student_id"
                  onValueChange={(value) => form.setValue('student_id', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona alumno" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Add student options */}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Fecha</label>
                <Input
                  type="date"
                  {...form.register('date')}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Profesor</label>
                <Select
                  name="teacher_id"
                  onValueChange={(value) => form.setValue('teacher_id', value)}
                  disabled={form.watch('auto_assign_instructor')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona profesor" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Add teacher options */}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Hora inicio</label>
                <Input
                  type="time"
                  {...form.register('start_time')}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Hora fin</label>
                <Input
                  type="time"
                  {...form.register('end_time')}
                />
              </div>

              {form.watch('type') === 'practical' && !form.watch('auto_assign_vehicle') && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Vehículo</label>
                  <Select
                    name="vehicle_id"
                    onValueChange={(value) => form.setValue('vehicle_id', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona vehículo" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Add vehicle options */}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="auto_assign_instructor"
                  checked={form.watch('auto_assign_instructor')}
                  onCheckedChange={(checked: boolean) => 
                    form.setValue('auto_assign_instructor', checked)
                  }
                />
                <Label htmlFor="auto_assign_instructor">
                  Asignar profesor automáticamente
                </Label>
              </div>

              {form.watch('type') === 'practical' && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="auto_assign_vehicle"
                    checked={form.watch('auto_assign_vehicle')}
                    onCheckedChange={(checked: boolean) => 
                      form.setValue('auto_assign_vehicle', checked)
                    }
                  />
                  <Label htmlFor="auto_assign_vehicle">
                    Asignar vehículo automáticamente
                  </Label>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="waiting_list"
                  checked={form.watch('waiting_list')}
                  onCheckedChange={(checked: boolean) => 
                    form.setValue('waiting_list', checked)
                  }
                />
                <Label htmlFor="waiting_list">
                  Añadir a lista de espera si no hay disponibilidad
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Notas</label>
              <Textarea
                {...form.register('notes')}
                placeholder="Añade notas sobre la clase..."
              />
            </div>

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