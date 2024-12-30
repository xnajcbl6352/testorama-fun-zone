import { Progress } from "@/components/ui/progress";

export function StudentProgress() {
  // This is a placeholder component that can be expanded with real progress data
  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Teoría</span>
          <span className="text-sm text-muted-foreground">75%</span>
        </div>
        <Progress value={75} />
      </div>
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Práctica</span>
          <span className="text-sm text-muted-foreground">60%</span>
        </div>
        <Progress value={60} />
      </div>
    </div>
  );
}