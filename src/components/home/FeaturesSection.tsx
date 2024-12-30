import { BarChart3, Trophy, Clock, Brain } from "lucide-react";

const features = [
  {
    title: "Progreso detallado",
    description: "Visualiza tu avance con gráficos claros y estadísticas personalizadas",
    icon: BarChart3,
    color: "text-blue-500",
    gradient: "from-blue-500/10 to-blue-500/5",
  },
  {
    title: "Gamificación",
    description: "Obtén logros y puntos mientras practicas para mantener la motivación",
    icon: Trophy,
    color: "text-yellow-500",
    gradient: "from-yellow-500/10 to-yellow-500/5",
  },
  {
    title: "Simulaciones reales",
    description: "Prepárate con exámenes que replican el formato oficial DGT",
    icon: Clock,
    color: "text-green-500",
    gradient: "from-green-500/10 to-green-500/5",
  },
  {
    title: "Tests personalizados",
    description: "Adapta el contenido a tu nivel y necesidades específicas",
    icon: Brain,
    color: "text-purple-500",
    gradient: "from-purple-500/10 to-purple-500/5",
  },
];

export function FeaturesSection() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold">Características principales</h2>
        <p className="text-gray-600">
          Todo lo que necesitas para aprobar tu examen a la primera
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className={`mb-4 rounded-xl bg-gradient-to-br ${feature.gradient} p-4 transition-transform group-hover:scale-110`}>
              <feature.icon className={`h-8 w-8 ${feature.color}`} />
            </div>
            <h3 className="mb-2 font-bold">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}