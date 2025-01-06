import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Mail, Phone, UserPlus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function LeadManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const filteredLeads = leads.filter(lead =>
    lead.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            className="pl-10"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Lead
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <p>Loading leads...</p>
        ) : (
          filteredLeads.map((lead) => (
            <Card key={lead.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold">{`${lead.first_name} ${lead.last_name}`}</h3>
                  <p className="text-sm text-muted-foreground">{lead.source}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                  lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {lead.status}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{lead.email}</span>
                </div>
                {lead.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{lead.phone}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Convert
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}