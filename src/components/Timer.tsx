import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface TimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
}

export function Timer({ duration, onTimeUp }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = (timeLeft / duration) * 100;
  const dashArray = 2 * Math.PI * 45; // circle radius * 2 * PI
  const dashOffset = dashArray * ((100 - progress) / 100);

  return (
    <div className="fixed right-4 top-4 flex items-center gap-4 rounded-lg bg-white/80 p-4 backdrop-blur-sm shadow-lg dark:bg-gray-900/80">
      <div className="relative h-16 w-16">
        <svg className="h-full w-full -rotate-90 transform">
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            className={`transition-all duration-1000 ${
              progress > 66
                ? "text-green-500"
                : progress > 33
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Clock className="h-6 w-6 text-primary" />
        </div>
      </div>
      <span className="font-mono text-xl font-semibold tabular-nums">
        {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
      </span>
    </div>
  );
}