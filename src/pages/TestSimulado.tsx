import { Clock } from "lucide-react";
import { TestPageLayout } from "@/components/test/TestPageLayout";

const TestSimulado = () => {
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

  return (
    <TestPageLayout
      title="Exámenes Simulados"
      icon={Clock}
      difficulty="Avanzado"
      duration="30 min"
      description="Simula las condiciones reales del examen DGT. Prepárate con los simulacros de 2024 y 2025."
      benefits={benefits}
      steps={steps}
    />
  );
};

export default TestSimulado;