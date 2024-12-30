import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Book,
  Brain,
  Trophy,
  BarChart3,
  FileQuestion,
  Clock,
} from "lucide-react";
import { TestTypeCard } from "@/components/TestTypeCard";
import { TimerDialog } from "@/components/TimerDialog";
import { Timer } from "@/components/Timer";

const Index = () => {
  const navigate = useNavigate();
  const [showTimerDialog, setShowTimerDialog] = useState(false);
  const [selectedTestType, setSelectedTestType] = useState<string | null>(null);
  const [timerDuration, setTimerDuration] = useState<number | null>(null);

  const testTypes = [
    {
      title: "Tests Simples",
      description: "Practica con tests de opción múltiple que replican el formato oficial DGT",
      longDescription: "Practica con preguntas generales para familiarizarte con el formato del examen oficial",
      icon: Book,
      difficulty: "Fácil" as const,
      path: "/test/simple",
    },
    {
      title: "Tests Temáticos",
      description: "Enfócate en áreas específicas como señales o normativa",
      longDescription: "Filtra preguntas por áreas específicas como señales de tráfico, normativa, etc.",
      icon: Brain,
      difficulty: "Intermedio" as const,
      path: "/test/tematico",
    },
    {
      title: "Tests Gamificados",
      description: "Aprende mientras ganas puntos y desbloqueas logros",
      longDescription: "Obtén recompensas como puntos, medallas, y compite en un ranking social",
      icon: Trophy,
      difficulty: "Fácil" as const,
      path: "/test/gamificado",
    },
    {
      title: "Tests Adaptativos",
      description: "Tests que se ajustan a tu nivel de conocimiento",
      longDescription: "Ajusta la dificultad automáticamente y recibe un informe final con gráficos de rendimiento",
      icon: BarChart3,
      difficulty: "Avanzado" as const,
      path: "/test/adaptativo",
    },
    {
      title: "Registro de Fallos",
      description: "Repasa y practica las preguntas que has fallado",
      longDescription: "Repite las preguntas que has fallado y mejora tus áreas débiles",
      icon: FileQuestion,
      difficulty: "Intermedio" as const,
      path: "/test/fallos",
    },
    {
      title: "Exámenes Simulados",
      description: "Prepárate con simulacros actualizados del examen DGT",
      longDescription: "Simula el examen oficial con condiciones reales y evaluaciones completas",
      icon: Clock,
      difficulty: "Avanzado" as const,
      path: "/test/simulado",
    },
  ];

  const handleTestSelection = (path: string) => {
    setSelectedTestType(path);
    setShowTimerDialog(true);
  };

  const handleTimerSelection = (duration: number) => {
    setTimerDuration(duration);
    if (selectedTestType) {
      navigate(selectedTestType);
    }
  };

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="hero-gradient px-6 py-24">
        <div className="container mx-auto text-center">
          <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            Domina el examen DGT con
            <span className="text-primary"> tests personalizados</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Prepárate para tu examen teórico con nuestra colección completa de
            tests adaptados a tu nivel y necesidades
          </p>
          <div className="mx-auto mb-8 max-w-md rounded-lg bg-primary/10 p-4 text-center">
            <p className="text-sm font-medium text-primary">
              ¡Inicia sesión para guardar tu progreso y preguntas falladas!
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testTypes.map((test) => (
            <TestTypeCard
              key={test.title}
              title={test.title}
              description={test.description}
              longDescription={test.longDescription}
              icon={test.icon}
              difficulty={test.difficulty}
              onClick={() => handleTestSelection(test.path)}
            />
          ))}
        </div>
      </div>

      <TimerDialog
        open={showTimerDialog}
        onOpenChange={setShowTimerDialog}
        onSelectDuration={handleTimerSelection}
      />

      {timerDuration && (
        <Timer duration={timerDuration} onTimeUp={() => console.log("Time's up!")} />
      )}
    </div>
  );
};

export default Index;