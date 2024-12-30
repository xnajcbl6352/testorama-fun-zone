import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  current: number;
  total: number;
  timeLeft?: number;
  totalTime?: number;
}

export function ProgressBar({ current, total, timeLeft, totalTime }: ProgressBarProps) {
  const progress = (current / total) * 100;
  const timeProgress = timeLeft && totalTime ? (timeLeft / totalTime) * 100 : null;

  return (
    <div className="fixed left-0 right-0 top-0 z-50 bg-white/80 p-4 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl items-center justify-between">
        <div className="flex items-center gap-4">
          <Progress value={progress} className="w-48" />
          <span className="text-sm font-medium">
            Pregunta {current}/{total}
          </span>
        </div>
        {timeLeft && totalTime && (
          <div className="flex items-center gap-4">
            <Progress
              value={timeProgress}
              className={cn(
                "w-24",
                timeProgress < 30 ? "bg-red-200" : timeProgress < 60 ? "bg-yellow-200" : "bg-green-200"
              )}
            />
            <span className="font-mono text-sm font-medium">
              {Math.ceil(timeLeft)}s
            </span>
          </div>
        )}
      </div>
    </div>
  );
}