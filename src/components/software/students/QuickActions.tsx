import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, FileText, Calendar, Mail } from "lucide-react";

export function QuickActions() {
  const actions = [
    { icon: UserPlus, label: "New Student", onClick: () => {} },
    { icon: FileText, label: "New Record", onClick: () => {} },
    { icon: Calendar, label: "Schedule Class", onClick: () => {} },
    { icon: Mail, label: "Send Message", onClick: () => {} },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            className="flex items-center justify-start space-x-2 h-auto py-4"
            onClick={action.onClick}
          >
            <action.icon className="h-4 w-4" />
            <span>{action.label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}