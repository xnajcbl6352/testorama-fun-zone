import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserCircle, CheckCircle, CreditCard, FileText } from "lucide-react";

export function ActivityCenter() {
  const activities = [
    {
      id: 1,
      type: "registration",
      title: "New Student Registration",
      description: "María García has registered",
      time: "2 hours ago",
      icon: UserCircle
    },
    {
      id: 2,
      type: "class",
      title: "Class Completed",
      description: "Practical class with Juan Pérez",
      time: "3 hours ago",
      icon: CheckCircle
    },
    {
      id: 3,
      type: "payment",
      title: "Payment Received",
      description: "€150 from Ana Martínez",
      time: "4 hours ago",
      icon: CreditCard
    }
  ];

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Calendar Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar mode="single" className="rounded-md border" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <activity.icon className="h-8 w-8 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}