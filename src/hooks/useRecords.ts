import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Record, RecordCreateInput, RecordUpdateInput } from '@/types/record';

export const useRecords = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const getRecords = useCallback(async () => {
    const { data, error } = await supabase
      .from('records')
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

  const { data: records, isLoading } = useQuery({
    queryKey: ['records'],
    queryFn: getRecords,
  });

  const createRecord = useMutation({
    mutationFn: async (input: RecordCreateInput) => {
      const { data, error } = await supabase
        .from('records')
        .insert([input])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['records'] });
      toast({
        title: "Expediente creado",
        description: "El expediente ha sido creado correctamente",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al crear expediente",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateRecord = useMutation({
    mutationFn: async ({ id, ...input }: RecordUpdateInput & { id: string }) => {
      const { data, error } = await supabase
        .from('records')
        .update(input)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['records'] });
      toast({
        title: "Expediente actualizado",
        description: "El expediente ha sido actualizado correctamente",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al actualizar expediente",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteRecord = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('records')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['records'] });
      toast({
        title: "Expediente eliminado",
        description: "El expediente ha sido eliminado correctamente",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al eliminar expediente",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const submitToDGT = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('records')
        .update({
          status: 'in_progress',
          dgt_submission_date: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['records'] });
      toast({
        title: "Expediente enviado",
        description: "El expediente ha sido enviado a la DGT correctamente",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al enviar expediente",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    records,
    isLoading,
    createRecord,
    updateRecord,
    deleteRecord,
    submitToDGT,
  };
};