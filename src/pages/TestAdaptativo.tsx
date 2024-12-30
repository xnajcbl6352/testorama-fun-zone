import { BarChart3 } from "lucide-react";
import { TestPageLayout } from "@/components/test/TestPageLayout";

const TestAdaptativo = () => {
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

  return (
    <TestPageLayout
      title="Tests Adaptativos"
      icon={BarChart3}
      difficulty="Avanzado"
      duration="25-30 min"
      description="El test que evoluciona contigo. Ajusta la dificultad según tu rendimiento y ofrece análisis detallados al finalizar."
      benefits={benefits}
      steps={steps}
    />
  );
};

export default TestAdaptativo;