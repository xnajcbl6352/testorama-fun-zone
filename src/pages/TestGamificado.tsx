import { Trophy } from "lucide-react";
import { TestPageLayout } from "@/components/test/TestPageLayout";

const TestGamificado = () => {
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

  return (
    <TestPageLayout
      title="Tests Gamificados"
      icon={Trophy}
      difficulty="Fácil"
      duration="20-25 min"
      description="Haz el aprendizaje divertido. Obtén puntos, sube de nivel y desbloquea logros mientras practicas."
      benefits={benefits}
      steps={steps}
    />
  );
};

export default TestGamificado;