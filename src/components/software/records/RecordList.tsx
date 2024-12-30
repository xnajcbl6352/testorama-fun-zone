import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Loader2 } from "lucide-react";

interface Record {
  id: string;
  record_number: string;
  status: string;
  creation_date: string;
  document_url?: string;
}

interface RecordListProps {
  studentId: string;
}

export function RecordList({ studentId }: RecordListProps) {
  const [records, setRecords] = useState<Record[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadRecords();
  }, [studentId]);

  const loadRecords = async () => {
    try {
      const { data, error } = await supabase
        .from("records")
        .select("*")
        .eq("student_id", studentId)
        .order("creation_date", { ascending: false });

      if (error) throw error;

      setRecords(data || []);
    } catch (error: any) {
      toast({
        title: "Error al cargar expedientes",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">
        No hay expedientes registrados
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {records.map((record) => (
        <div
          key={record.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg border"
        >
          <div className="flex items-center gap-4">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">{record.record_number}</p>
              <p className="text-sm text-gray-500">
                {new Date(record.creation_date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge className={getStatusColor(record.status)}>
              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
            </Badge>
            {record.document_url && (
              <Button variant="outline" size="sm" asChild>
                <a href={record.document_url} target="_blank" rel="noopener noreferrer">
                  Ver Documento
                </a>
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}