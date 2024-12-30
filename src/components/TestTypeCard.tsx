import { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TestTypeCardProps {
  title: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  difficulty?: "Fácil" | "Intermedio" | "Avanzado";
  duration?: string;
  onClick: () => void;
}

export function TestTypeCard({
  title,
  description,
  longDescription,
  icon: Icon,
  difficulty,
  duration,
  onClick,
}: TestTypeCardProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            className="group relative cursor-pointer transition-all hover:shadow-lg"
            onClick={onClick}
          >
            <CardHeader>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex flex-wrap gap-2">
                {difficulty && (
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {difficulty}
                  </span>
                )}
                {duration && (
                  <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
                    {duration}
                  </span>
                )}
              </div>
              <CardTitle className="mt-4 text-xl">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 p-6 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-center text-sm text-white">{longDescription}</p>
              </div>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs text-center">
          <p>{longDescription}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}