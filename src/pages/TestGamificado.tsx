import { Trophy } from "lucide-react";
import { TestPageLayout } from "@/components/test/TestPageLayout";
import { useState } from "react";
import { TestInterface } from "@/components/test/TestInterface";

const TestGamificado = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

  const benefits = [
    {
      icon: "🏅",
      text: "Logros y Recompensas: Gana medallas y puntos por cada respuesta correcta",
    },
    {
      icon: "📊",
      text: "Ranking Opcional: Compite contra otros usuarios registrados",
    },
    {
      icon: "🎯",
      text: "Diversión Garantizada: Sistema de niveles para mantener la motivación",
    },
  ];

  const steps = [
    "Selecciona el test gamificado",
    "Responde preguntas y acumula puntos",
    "Revisa tu progreso y desbloquea recompensas",
  ];

  const handleStartTest = (duration: number | null) => {
    setSelectedDuration(duration);
    setHasStarted(true);
  };

  if (hasStarted) {
    return (
      <TestInterface
        type="gamificado"
        title="Test Gamificado"
        duration={selectedDuration ?? undefined}
      />
    );
  }

  return (
    <TestPageLayout
      title="Tests Gamificados"
      icon={Trophy}
      difficulty="Fácil"
      duration="20-25 min"
      description="Haz el aprendizaje divertido. Obtén puntos, sube de nivel y desbloquea logros mientras practicas."
      benefits={benefits}
      steps={steps}
      onStartTest={handleStartTest}
    />
  );
};

export default TestGamificado;