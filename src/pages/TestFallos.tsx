import { XOctagon } from "lucide-react";
import { TestPageLayout } from "@/components/test/TestPageLayout";

const TestFallos = () => {
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

  return (
    <TestPageLayout
      title="Registro de Fallos"
      icon={XOctagon}
      difficulty="Intermedio"
      duration="15-20 min"
      description="Revisa y practica tus errores. Genera tests personalizados con tus respuestas incorrectas."
      benefits={benefits}
      steps={steps}
    />
  );
};

export default TestFallos;