import { Clock } from "lucide-react";
import { TestPageLayout } from "@/components/test/TestPageLayout";
import { useState } from "react";
import { TestInterface } from "@/components/test/TestInterface";

const TestSimulado = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

  const benefits = [
    {
      icon: "🕒",
      text: "Simulación Real: Preguntas con temporizador activado",
    },
    {
      icon: "📋",
      text: 'Evaluación Final: "Aprobado" o "Suspendido" basado en criterios oficiales',
    },
    {
      icon: "📊",
      text: "Análisis de Áreas: Desglose de rendimiento por tema",
    },
  ];

  const steps = [
    "Selecciona el simulacro (2024 o 2025)",
    "Responde preguntas con tiempo limitado",
    "Revisa tu evaluación final y áreas de mejora",
  ];

  const handleStartTest = (duration: number | null) => {
    setSelectedDuration(duration);
    setHasStarted(true);
  };

  if (hasStarted) {
    return (
      <TestInterface
        type="simulado"
        title="Examen Simulado"
        duration={selectedDuration ?? undefined}
      />
    );
  }

  return (
    <TestPageLayout
      title="Exámenes Simulados"
      icon={Clock}
      difficulty="Avanzado"
      duration="30 min"
      description="Simula las condiciones reales del examen DGT. Prepárate con los simulacros de 2024 y 2025."
      benefits={benefits}
      steps={steps}
      onStartTest={handleStartTest}
    />
  );
};

export default TestSimulado;