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
      className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary/80" />
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
          <p className="text-sm text-gray-600 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {longDescription}
          </p>
        </div>
      </div>
    </Card>
  );
}