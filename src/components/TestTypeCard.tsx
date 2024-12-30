import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

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
    <Card
      className="test-card group cursor-pointer"
      onClick={onClick}
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="feature-icon h-6 w-6 text-primary/80" />
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
      
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      
      <div className="mt-4 overflow-hidden">
        <p className="text-sm text-gray-600 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {longDescription}
        </p>
      </div>
    </Card>
  );
}