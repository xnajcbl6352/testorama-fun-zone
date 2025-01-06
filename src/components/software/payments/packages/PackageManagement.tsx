import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, Tag, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "@/lib/utils";

export function PackageManagement() {
  const { data: packages, isLoading } = useQuery({
    queryKey: ["pricing-packages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pricing_packages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Cargando paquetes...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Paquetes y Promociones</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Paquete
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {packages?.map((pkg) => (
          <Card key={pkg.id} className="hover:bg-accent/50 transition-colors">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  {pkg.name}
                </CardTitle>
                <Badge variant={pkg.is_active ? "default" : "secondary"}>
                  {pkg.is_active ? "Activo" : "Inactivo"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{pkg.description}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span>Precio Base</span>
                  </div>
                  <span className="font-bold">{formatCurrency(pkg.base_price)}</span>
                </div>
                {pkg.seasonal_multiplier !== 1 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Multiplicador Temporal</span>
                    </div>
                    <span>x{pkg.seasonal_multiplier}</span>
                  </div>
                )}
              </div>
              <Button className="w-full" variant="outline">
                Editar Paquete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}