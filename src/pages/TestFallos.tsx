import { XOctagon } from "lucide-react";
import { TestPageLayout } from "@/components/test/TestPageLayout";
import { useState } from "react";
import { TestInterface } from "@/components/test/TestInterface";

const TestFallos = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

  const benefits = [
    {
      icon: "📂",
      text: "Almacenamiento Automático: Cada error se guarda automáticamente",
    },
    {
      icon: "✅",
      text: "Actualización Dinámica: Las respuestas correctas se eliminan del registro",
    },
    {
      icon: "🗒️",
      text: "Test Personalizado: Genera un test exclusivamente con tus fallos",
    },
  ];

  const steps = [
    "Accede al registro de fallos",
    "Genera un test personalizado con preguntas incorrectas",
    "Practica y elimina errores correctamente respondidos",
  ];

  const handleStartTest = (duration: number | null) => {
    setSelectedDuration(duration);
    setHasStarted(true);
  };

  if (hasStarted) {
    return (
      <TestInterface
        type="fallos"
        title="Test de Fallos"
        duration={selectedDuration ?? undefined}
      />
    );
  }

  return (
    <TestPageLayout
      title="Registro de Fallos"
      icon={XOctagon}
      difficulty="Intermedio"
      duration="15-20 min"
      description="Revisa y practica tus errores. Genera tests personalizados con tus respuestas incorrectas."
      benefits={benefits}
      steps={steps}
      onStartTest={handleStartTest}
    />
  );
};

export default TestFallos;