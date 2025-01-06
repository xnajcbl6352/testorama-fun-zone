import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle, CheckCircle, Clock, RefreshCw } from "lucide-react";

interface Record {
  id: string;
  record_number: string;
  status: string;
  creation_date: string;
  dgt_submission_date: string | null;
  dgt_response_date: string | null;
  dgt_response_status: string | null;
}

export function DGTStatusTracking() {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const { data, error } = await supabase
        .from('records')
        .select('*')
        .order('creation_date', { ascending: false });

      if (error) throw error;
      setRecords(data || []);
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'in_progress':
        return <RefreshCw className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seguimiento de Expedientes</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {records.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(record.status)}
                    <span className="font-medium">{record.record_number}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enviado: {formatDate(record.creation_date)}
                  </p>
                </div>
                <Badge
                  variant={record.status === 'completed' ? 'default' : 'secondary'}
                >
                  {record.status === 'completed' ? 'Completado' : 'En Proceso'}
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}