import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";

interface HistoryRecord {
  id: string;
  record_number: string;
  status: string;
  creation_date: string;
  dgt_response_date: string | null;
  dgt_comments: string | null;
}

export function DGTHistory() {
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('records')
        .select('*')
        .order('creation_date', { ascending: false });

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Trámites</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px]">
          <div className="space-y-6">
            {history.map((record) => (
              <div
                key={record.id}
                className="border-l-4 border-l-primary pl-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(record.status)}
                    <span className="font-medium">{record.record_number}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(record.creation_date)}
                  </span>
                </div>
                {record.dgt_comments && (
                  <p className="text-sm text-muted-foreground">
                    {record.dgt_comments}
                  </p>
                )}
                {record.dgt_response_date && (
                  <p className="text-xs text-muted-foreground">
                    Respuesta DGT: {formatDate(record.dgt_response_date)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}