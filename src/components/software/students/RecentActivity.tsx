import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserCircle } from "lucide-react";

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      student: "María García",
      action: "completed practical test",
      time: "2 hours ago"
    },
    {
      id: 2,
      student: "Juan Pérez",
      action: "registered for theory class",
      time: "3 hours ago"
    },
    {
      id: 3,
      student: "Ana Martínez",
      action: "submitted new document",
      time: "5 hours ago"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 text-sm"
              >
                <UserCircle className="h-8 w-8 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="font-medium">{activity.student}</p>
                  <p className="text-muted-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}