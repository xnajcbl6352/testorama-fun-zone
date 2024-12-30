import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStudents } from "@/hooks/useStudents";
import { useInvoices } from "@/hooks/useInvoices";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  student_id: z.string().min(1, "Por favor selecciona un alumno"),
  invoice_number: z.string().optional(),
  amount: z.string().min(1, "El importe es requerido"),
  due_date: z.string().min(1, "La fecha de vencimiento es requerida"),
});

interface InvoiceFormProps {
  open: boolean;
  onClose: () => void;
}

export function InvoiceForm({ open, onClose }: InvoiceFormProps) {
  const { students } = useStudents();
  const { createInvoice } = useInvoices();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_id: "",
      invoice_number: "",
      amount: "",
      due_date: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      await createInvoice.mutateAsync({
        student_id: values.student_id,
        invoice_number: values.invoice_number || undefined,
        amount: parseFloat(values.amount),
        due_date: values.due_date,
      });
      onClose();
      form.reset();
    } catch (error) {
      console.error("Error creating invoice:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Nueva Factura</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="student_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alumno</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un alumno" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {students?.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.first_name} {student.last_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="invoice_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Factura (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="INV-2024-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Importe</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="due_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Vencimiento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creando..." : "Crear Factura"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}