import { LucideIcon } from "lucide-react";

interface TestCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
}

export function TestCard({ title, description, icon: Icon, onClick }: TestCardProps) {
  return (
    <div className="test-card cursor-pointer" onClick={onClick}>
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}