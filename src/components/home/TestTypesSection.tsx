import { Book, Brain, Trophy, BarChart3, FileQuestion, Clock } from "lucide-react";
import { TestTypeCard } from "@/components/TestTypeCard";
import { useNavigate } from "react-router-dom";

const testTypes = [
  {
    title: "Tests Simples",
    description: "Practica con tests de opción múltiple que replican el formato oficial DGT",
    longDescription: "Practica con preguntas generales para familiarizarte con el formato del examen oficial",
    icon: Book,
    difficulty: "Fácil" as const,
    duration: "10-15 min",
    path: "/test/simple",
  },
  {
    title: "Tests Temáticos",
    description: "Enfócate en áreas específicas como señales o normativa",
    longDescription: "Filtra preguntas por áreas específicas como señales de tráfico, normativa, etc.",
    icon: Brain,
    difficulty: "Intermedio" as const,
    duration: "15-20 min",
    path: "/test/tematico",
  },
  {
    title: "Tests Gamificados",
    description: "Aprende mientras ganas puntos y desbloqueas logros",
    longDescription: "Obtén recompensas como puntos, medallas, y compite en un ranking social",
    icon: Trophy,
    difficulty: "Fácil" as const,
    duration: "20-25 min",
    path: "/test/gamificado",
  },
  {
    title: "Tests Adaptativos",
    description: "Tests que se ajustan a tu nivel de conocimiento",
    longDescription: "Ajusta la dificultad automáticamente y recibe un informe final con gráficos de rendimiento",
    icon: BarChart3,
    difficulty: "Avanzado" as const,
    duration: "25-30 min",
    path: "/test/adaptativo",
  },
  {
    title: "Registro de Fallos",
    description: "Repasa y practica las preguntas que has fallado",
    longDescription: "Repite las preguntas que has fallado y mejora tus áreas débiles",
    icon: FileQuestion,
    difficulty: "Intermedio" as const,
    duration: "15-20 min",
    path: "/test/fallos",
  },
  {
    title: "Exámenes Simulados",
    description: "Prepárate con simulacros actualizados del examen DGT",
    longDescription: "Simula el examen oficial con condiciones reales y evaluaciones completas",
    icon: Clock,
    difficulty: "Avanzado" as const,
    duration: "30 min",
    path: "/test/simulado",
  },
];

export function TestTypesSection() {
  const navigate = useNavigate();

  const handleTestSelect = (path: string) => {
    console.info("Selected test:", path);
    navigate(path);
  };

  return (
    <div className="container mx-auto px-6 py-16 sm:py-24">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold">Elige tu tipo de test</h2>
        <p className="text-gray-600">
          Selecciona el formato que mejor se adapte a tus necesidades de estudio
        </p>
      </div>

      <div className="grid animate-fade-in gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testTypes.map((test) => (
          <TestTypeCard
            key={test.title}
            title={test.title}
            description={test.description}
            longDescription={test.longDescription}
            icon={test.icon}
            difficulty={test.difficulty}
            duration={test.duration}
            onClick={() => handleTestSelect(test.path)}
          />
        ))}
      </div>
    </div>
  );
}