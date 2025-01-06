import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Clock } from "lucide-react";

export function AvailabilityManager() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Calendario de Disponibilidad</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Horarios Disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {["Mañana", "Tarde", "Noche"].map((timeSlot) => (
              <div key={timeSlot} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{timeSlot}</span>
                </div>
                <Button variant="outline">Marcar Disponible</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}