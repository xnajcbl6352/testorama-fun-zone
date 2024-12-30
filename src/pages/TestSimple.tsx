import { Book } from "lucide-react";
import { TestPageLayout } from "@/components/test/TestPageLayout";
import { useState } from "react";
import { TestInterface } from "@/components/test/TestInterface";

const TestSimple = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

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

  const handleStartTest = (duration: number | null) => {
    setSelectedDuration(duration);
    setHasStarted(true);
  };

  if (hasStarted) {
    return (
      <TestInterface
        type="simple"
        title="Test Simple"
        duration={selectedDuration ?? undefined}
      />
    );
  }

  return (
    <TestPageLayout
      title="Tests Simples"
      icon={Book}
      difficulty="Fácil"
      duration="10-15 min"
      description="Practica preguntas generales en formato oficial. Ideal para principiantes que desean familiarizarse con el examen DGT."
      benefits={benefits}
      steps={steps}
      onStartTest={handleStartTest}
    />
  );
};

export default TestSimple;