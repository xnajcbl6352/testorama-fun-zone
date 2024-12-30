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
  onClick: () => void;
}

export function TestTypeCard({
  title,
  description,
  longDescription,
  icon: Icon,
  difficulty,
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
              {difficulty && (
                <span className="absolute right-4 top-4 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {difficulty}
                </span>
              )}
              <CardTitle className="text-xl">{title}</CardTitle>
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