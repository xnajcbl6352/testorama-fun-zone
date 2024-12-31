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
import { useToast } from "@/components/ui/use-toast";
import { useRecords } from "@/hooks/useRecords";
import { DocumentUpload } from "./DocumentUpload";
import { StudentSelect } from "./form/StudentSelect";
import { StatusSelect } from "./form/StatusSelect";
import { useState } from "react";
import type { RecordCreateInput } from "@/types/record";

const formSchema = z.object({
  student_id: z.string().min(1, "Por favor selecciona un alumno"),
  record_number: z.string().min(3, "El número de expediente debe tener al menos 3 caracteres"),
  status: z.enum(["pending", "in_progress", "completed"]),
  document_url: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface RecordFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: FormValues & { id: string };
}

export function RecordForm({ open, onClose, initialData }: RecordFormProps) {
  const { createRecord, updateRecord } = useRecords();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      status: "pending",
      student_id: "",
      record_number: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      if (initialData?.id) {
        await updateRecord.mutateAsync({
          id: initialData.id,
          ...values,
        });
        toast({
          title: "Éxito",
          description: "Expediente actualizado correctamente",
        });
      } else {
        const recordInput: RecordCreateInput = {
          student_id: values.student_id,
          record_number: values.record_number,
          status: values.status,
          document_url: values.document_url,
        };
        await createRecord.mutateAsync(recordInput);
        toast({
          title: "Éxito",
          description: "Expediente creado correctamente",
        });
      }
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Editar Expediente" : "Crear Nuevo Expediente"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <StudentSelect form={form} />

            <FormField
              control={form.control}
              name="record_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Expediente</FormLabel>
                  <FormControl>
                    <Input placeholder="EXP-2024-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <StatusSelect form={form} />

            <FormField
              control={form.control}
              name="document_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Documento</FormLabel>
                  <FormControl>
                    <DocumentUpload
                      onUploadComplete={field.onChange}
                      currentUrl={field.value}
                    />
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
                {isSubmitting
                  ? "Guardando..."
                  : initialData
                  ? "Actualizar Expediente"
                  : "Crear Expediente"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}