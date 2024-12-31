import { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureCardProps {
  feature: Feature;
  onClick: () => void;
}

export function FeatureCard({ feature, onClick }: FeatureCardProps) {
  return (
    <div
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="mb-4">
        <feature.icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="font-semibold mb-2">{feature.title}</h3>
      <p className="text-sm text-gray-600">{feature.description}</p>
    </div>
  );
}