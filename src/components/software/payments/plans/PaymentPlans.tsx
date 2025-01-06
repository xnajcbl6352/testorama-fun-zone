import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, Calendar, CreditCard, Clock } from "lucide-react";

export function PaymentPlans() {
  const { toast } = useToast();
  const [plans] = useState([
    {
      id: 1,
      name: "Plan Mensual",
      description: "Pago dividido en cuotas mensuales",
      installments: 12,
      interest: 5,
    },
    {
      id: 2,
      name: "Plan Trimestral",
      description: "Pago dividido en cuotas trimestrales",
      installments: 4,
      interest: 3,
    },
    {
      id: 3,
      name: "Plan Semestral",
      description: "Pago dividido en dos cuotas",
      installments: 2,
      interest: 2,
    },
  ]);

  const handleCreatePlan = () => {
    toast({
      title: "Próximamente",
      description: "La creación de planes estará disponible pronto",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Planes de Pago</h2>
        <Button onClick={handleCreatePlan}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Plan
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className="hover:bg-accent/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {plan.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{plan.description}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span>{plan.installments} cuotas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{plan.interest}% interés</span>
                </div>
              </div>
              <Button className="w-full" variant="outline">
                Ver Detalles
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}