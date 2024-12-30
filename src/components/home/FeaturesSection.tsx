import { BarChart3, Trophy, Clock, Brain } from "lucide-react";

const features = [
  {
    title: "Progreso detallado",
    description: "Visualiza tu avance con gráficos claros",
    icon: BarChart3,
    color: "text-blue-500",
  },
  {
    title: "Gamificación",
    description: "Obtén logros y puntos mientras practicas",
    icon: Trophy,
    color: "text-yellow-500",
  },
  {
    title: "Simulaciones reales",
    description: "Prepárate con exámenes oficiales",
    icon: Clock,
    color: "text-green-500",
  },
  {
    title: "Tests personalizados",
    description: "Adapta el contenido a tu nivel",
    icon: Brain,
    color: "text-purple-500",
  },
];

export function FeaturesSection() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group flex flex-col items-center text-center transition-all hover:-translate-y-1"
          >
            <div className={`mb-4 rounded-full bg-white p-4 shadow-md transition-all group-hover:shadow-lg ${feature.color}`}>
              <feature.icon className="h-8 w-8" />
            </div>
            <h3 className="mb-2 font-bold">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}