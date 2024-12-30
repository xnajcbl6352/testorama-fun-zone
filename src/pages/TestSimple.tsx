import { Book } from "lucide-react";
import { TestPageLayout } from "@/components/test/TestPageLayout";

const TestSimple = () => {
  const benefits = [
    {
      icon: "💡",
      text: "Formato Oficial: Preguntas que replican el examen real",
    },
    {
      icon: "✅",
      text: "Retroalimentación Instantánea: Recibe notificaciones de Correcto/Incorrecto tras cada respuesta",
    },
    {
      icon: "📊",
      text: "Resultados Claros: Total de preguntas correctas e incorrectas con recomendaciones",
    },
  ];

  const steps = [
    "Selecciona una categoría (general o específica)",
    "Responde preguntas de opción múltiple",
    "Revisa tus resultados y recomendaciones",
  ];

  return (
    <TestPageLayout
      title="Tests Simples"
      icon={Book}
      difficulty="Fácil"
      duration="10-15 min"
      description="Practica preguntas generales en formato oficial. Ideal para principiantes que desean familiarizarse con el examen DGT."
      benefits={benefits}
      steps={steps}
    />
  );
};

export default TestSimple;