import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Invoice, InvoiceCreateInput } from '@/types/invoice';

export const useInvoices = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const getInvoices = useCallback(async () => {
    const { data, error } = await supabase
      .from('invoices')
      .select(`
        *,
        students (
          id,
          first_name,
          last_name,
          dni
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }, []);

  const { data: invoices, isLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: getInvoices,
  });

  const createInvoice = useMutation({
    mutationFn: async (input: InvoiceCreateInput) => {
      const invoiceInput = {
        ...input,
        invoice_number: input.invoice_number || `INV-${Date.now()}`,
      };

      const { data, error } = await supabase
        .from('invoices')
        .insert(invoiceInput)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({
        title: "Factura creada",
        description: "La factura ha sido creada correctamente",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al crear factura",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    invoices,
    isLoading,
    createInvoice,
  };
};