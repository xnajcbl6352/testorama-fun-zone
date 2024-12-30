import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Book,
  Brain,
  Trophy,
  BarChart3,
  FileQuestion,
  Clock,
  Moon,
  Sun,
  Info,
} from "lucide-react";
import { TestTypeCard } from "@/components/TestTypeCard";
import { TimerDialog } from "@/components/TimerDialog";
import { Timer } from "@/components/Timer";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

const Index = () => {
  const navigate = useNavigate();
  const [showTimerDialog, setShowTimerDialog] = useState(false);
  const [selectedTestType, setSelectedTestType] = useState<string | null>(null);
  const [timerDuration, setTimerDuration] = useState<number | null>(null);
  const { theme, setTheme } = useTheme();

  const features = [
    {
      title: "Tests personalizados para todos los niveles",
      description: "Adapta tu aprendizaje a tu ritmo",
      icon: Brain,
    },
    {
      title: "Análisis detallado de tu progreso",
      description: "Visualiza tu evolución con gráficos interactivos",
      icon: BarChart3,
    },
    {
      title: "Gamificación para mantenerte motivado",
      description: "Gana puntos y desbloquea logros mientras aprendes",
      icon: Trophy,
    },
    {
      title: "Simulaciones oficiales del examen DGT",
      description: "Prepárate con tests que replican el formato oficial",
      icon: FileQuestion,
    },
  ];

  const testTypes = [
    {
      title: "Tests Simples",
      description: "Practica con tests de opción múltiple que replican el formato oficial DGT",
      longDescription: "Practica con preguntas generales para familiarizarte con el formato del examen oficial",
      icon: Book,
      difficulty: "Fácil" as const,
      duration: "10-15 min",
      path: "/test/simple",
    },
    {
      title: "Tests Temáticos",
      description: "Enfócate en áreas específicas como señales o normativa",
      longDescription: "Filtra preguntas por áreas específicas como señales de tráfico, normativa, etc.",
      icon: Brain,
      difficulty: "Intermedio" as const,
      duration: "15-20 min",
      path: "/test/tematico",
    },
    {
      title: "Tests Gamificados",
      description: "Aprende mientras ganas puntos y desbloqueas logros",
      longDescription: "Obtén recompensas como puntos, medallas, y compite en un ranking social",
      icon: Trophy,
      difficulty: "Fácil" as const,
      duration: "20-25 min",
      path: "/test/gamificado",
    },
    {
      title: "Tests Adaptativos",
      description: "Tests que se ajustan a tu nivel de conocimiento",
      longDescription: "Ajusta la dificultad automáticamente y recibe un informe final con gráficos de rendimiento",
      icon: BarChart3,
      difficulty: "Avanzado" as const,
      duration: "25-30 min",
      path: "/test/adaptativo",
    },
    {
      title: "Registro de Fallos",
      description: "Repasa y practica las preguntas que has fallado",
      longDescription: "Repite las preguntas que has fallado y mejora tus áreas débiles",
      icon: FileQuestion,
      difficulty: "Intermedio" as const,
      duration: "15-20 min",
      path: "/test/fallos",
    },
    {
      title: "Exámenes Simulados",
      description: "Prepárate con simulacros actualizados del examen DGT",
      longDescription: "Simula el examen oficial con condiciones reales y evaluaciones completas",
      icon: Clock,
      difficulty: "Avanzado" as const,
      duration: "30 min",
      path: "/test/simulado",
    },
  ];

  const handleTestSelection = (path: string) => {
    setSelectedTestType(path);
    setShowTimerDialog(true);
  };

  const handleTimerSelection = (duration: number) => {
    setTimerDuration(duration);
    if (selectedTestType) {
      navigate(selectedTestType);
    }
  };

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero Section */}
      <div className="hero-gradient px-6 py-24">
        <div className="container mx-auto text-center">
          <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            Domina el examen DGT con
            <span className="text-primary"> tests personalizados</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Prepárate para tu examen teórico con nuestra colección completa de
            tests adaptados a tu nivel y necesidades
          </p>
          
          {/* CTA Buttons */}
          <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="group relative w-full overflow-hidden sm:w-auto"
              onClick={() => navigate("/login")}
            >
              <span className="relative z-10">Inicia sesión para guardar tu progreso</span>
              <div className="absolute inset-0 bg-primary/10 transition-transform duration-300 group-hover:scale-x-100" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group w-full sm:w-auto"
              onClick={() => navigate("/register")}
            >
              <span>Descubre más tipos de test</span>
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl bg-white p-6 shadow-lg transition-all hover:shadow-xl"
              >
                <feature.icon className="mx-auto mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 font-bold">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Test Types Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Elige tu tipo de test</h2>
          <p className="text-gray-600">
            Selecciona el formato que mejor se adapte a tus necesidades de estudio
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testTypes.map((test) => (
            <TestTypeCard
              key={test.title}
              title={test.title}
              description={test.description}
              longDescription={test.longDescription}
              icon={test.icon}
              difficulty={test.difficulty}
              duration={test.duration}
              onClick={() => handleTestSelection(test.path)}
            />
          ))}
        </div>
      </div>

      {/* Theme Toggle */}
      <button
        className="fixed bottom-4 right-4 rounded-full bg-white p-3 shadow-lg transition-all hover:shadow-xl"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <Sun className="h-6 w-6" />
        ) : (
          <Moon className="h-6 w-6" />
        )}
      </button>

      {/* Timer Dialog */}
      <TimerDialog
        open={showTimerDialog}
        onOpenChange={setShowTimerDialog}
        onSelectDuration={handleTimerSelection}
      />

      {/* Active Timer */}
      {timerDuration && (
        <Timer
          duration={timerDuration}
          onTimeUp={() => console.log("Time's up!")}
        />
      )}
    </div>
  );
};

export default Index;