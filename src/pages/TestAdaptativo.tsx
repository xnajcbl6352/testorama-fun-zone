import { BarChart3 } from "lucide-react";
import { TestPageLayout } from "@/components/test/TestPageLayout";
import { useState } from "react";
import { TestInterface } from "@/components/test/TestInterface";

const TestAdaptativo = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

  const benefits = [
    {
      icon: "🎯",
      text: "Progresión Dinámica: Aumenta o disminuye la dificultad según tus respuestas",
    },
    {
      icon: "📊",
      text: "Análisis Detallado: Informe final con gráficos de rendimiento",
    },
    {
      icon: "🧩",
      text: "Sugerencias Personalizadas: Recomendaciones para mejorar áreas específicas",
    },
  ];

  const steps = [
    "Comienza con preguntas de dificultad media",
    "Responde para ajustar la dificultad automáticamente",
    "Revisa el informe final y obtén recomendaciones",
  ];

  const handleStartTest = (duration: number | null) => {
    setSelectedDuration(duration);
    setHasStarted(true);
  };

  if (hasStarted) {
    return (
      <TestInterface
        type="adaptativo"
        title="Test Adaptativo"
        duration={selectedDuration ?? undefined}
      />
    );
  }

  return (
    <TestPageLayout
      title="Tests Adaptativos"
      icon={BarChart3}
      difficulty="Avanzado"
      duration="25-30 min"
      description="El test que evoluciona contigo. Ajusta la dificultad según tu rendimiento y ofrece análisis detallados al finalizar."
      benefits={benefits}
      steps={steps}
      onStartTest={handleStartTest}
    />
  );
};

export default TestAdaptativo;