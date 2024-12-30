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
    <div className="border-t border-border/50 bg-white/50 backdrop-blur-sm dark:bg-gray-900/50">
      <div className="container py-2">
        <div className="flex items-center justify-between gap-8">
          <div className="flex flex-1 items-center gap-4">
            <Progress 
              value={progress} 
              className="h-2 bg-primary/20"
            />
            <span className="text-sm font-medium tabular-nums">
              {current}/{total}
            </span>
          </div>
          {timeLeft && totalTime && (
            <div className="flex items-center gap-4">
              <Progress
                value={timeProgress}
                className={cn(
                  "h-2 w-24",
                  timeProgress > 66 ? "bg-green-200" : 
                  timeProgress > 33 ? "bg-yellow-200" : 
                  "bg-red-200"
                )}
              />
              <span className="font-mono text-sm font-medium tabular-nums">
                {Math.ceil(timeLeft)}s
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}