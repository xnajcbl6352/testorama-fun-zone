import { Brain, BarChart3, Trophy, FileQuestion } from "lucide-react";

const features = [
  {
    title: "Tests personalizados para todos los niveles",
    description: "Adapta tu aprendizaje a tu ritmo",
    icon: Brain,
  },
  {
    title: "Análisis detallado de tu progreso",
    description: "Visualiza tu evolución con gráficos interactivos",
    icon: BarChart3,
  },
  {
    title: "Gamificación para mantenerte motivado",
    description: "Gana puntos y desbloquea logros mientras aprendes",
    icon: Trophy,
  },
  {
    title: "Simulaciones oficiales del examen DGT",
    description: "Prepárate con tests que replican el formato oficial",
    icon: FileQuestion,
  },
];

export function FeaturesSection() {
  return (
    <div className="grid animate-fade-in gap-6 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="group rounded-xl bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        >
          <feature.icon className="mx-auto mb-4 h-8 w-8 text-primary transition-transform group-hover:scale-110" />
          <h3 className="mb-2 font-bold">{feature.title}</h3>
          <p className="text-sm text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}