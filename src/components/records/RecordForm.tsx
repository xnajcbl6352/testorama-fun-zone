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

const formSchema = z.object({
  student_id: z.string().min(1, "Please select a student"),
  record_number: z.string().min(3, "Record number must be at least 3 characters"),
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
          title: "Success",
          description: "Record updated successfully",
        });
      } else {
        await createRecord.mutateAsync(values);
        toast({
          title: "Success",
          description: "Record created successfully",
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
            {initialData ? "Edit Record" : "Create New Record"}
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
                  <FormLabel>Record Number</FormLabel>
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
                  <FormLabel>Document</FormLabel>
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
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Saving..."
                  : initialData
                  ? "Update Record"
                  : "Create Record"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}