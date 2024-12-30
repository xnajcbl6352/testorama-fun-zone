import { Brain } from "lucide-react";
import { TestPageLayout } from "@/components/test/TestPageLayout";

const TestTematico = () => {
  const benefits = [
    {
      icon: "🧠",
      text: "Foco Temático: Preguntas organizadas por categorías",
    },
    {
      icon: "📈",
      text: "Progresión por Complejidad: Preguntas de nivel básico, intermedio y avanzado",
    },
    {
      icon: "🗂️",
      text: "Desglose Detallado: Resultados segmentados por subcategorías",
    },
  ];

  const steps = [
    "Selecciona un tema desde el menú (ej. Señales de Tráfico)",
    "Responde preguntas relacionadas exclusivamente con el tema",
    "Revisa resultados con análisis por subcategorías",
  ];

  return (
    <TestPageLayout
      title="Tests Temáticos"
      icon={Brain}
      difficulty="Intermedio"
      duration="15-20 min"
      description="Tests específicos para reforzar tus puntos débiles. Enfócate en áreas como señales de tráfico, normativa y más."
      benefits={benefits}
      steps={steps}
    />
  );
};

export default TestTematico;