import { LucideIcon } from "lucide-react";
import { FeatureCard } from "./FeatureCard";
import { features } from "./featuresData";

interface FeatureGridProps {
  onFeatureSelect: (title: string) => void;
}

export function FeatureGrid({ onFeatureSelect }: FeatureGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          feature={feature}
          onClick={() => onFeatureSelect(feature.title)}
        />
      ))}
    </div>
  );
}