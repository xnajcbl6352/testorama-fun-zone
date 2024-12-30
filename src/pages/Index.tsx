import { Book, Brain, Clock, Trophy, FileQuestion, BarChart3 } from "lucide-react";
import { TestCard } from "@/components/TestCard";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const testTypes = [
    {
      title: "Tests Simples",
      description: "Practica con tests de opción múltiple que replican el formato oficial DGT",
      icon: Book,
      path: "/test/simple",
    },
    {
      title: "Tests Temáticos",
      description: "Enfócate en áreas específicas como señales o normativa",
      icon: Brain,
      path: "/test/tematico",
    },
    {
      title: "Tests Gamificados",
      description: "Aprende mientras ganas puntos y desbloqueas logros",
      icon: Trophy,
      path: "/test/gamificado",
    },
    {
      title: "Tests Adaptativos",
      description: "Tests que se ajustan a tu nivel de conocimiento",
      icon: BarChart3,
      path: "/test/adaptativo",
    },
    {
      title: "Registro de Fallos",
      description: "Repasa y practica las preguntas que has fallado",
      icon: FileQuestion,
      path: "/test/fallos",
    },
    {
      title: "Exámenes Simulados",
      description: "Prepárate con simulacros actualizados del examen DGT",
      icon: Clock,
      path: "/test/simulado",
    },
  ];

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="hero-gradient px-6 py-24">
        <div className="container mx-auto text-center">
          <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            Domina el examen DGT con
            <span className="text-primary"> tests personalizados</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Prepárate para tu examen teórico con nuestra colección completa de tests adaptados a tu nivel y necesidades
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testTypes.map((test) => (
            <TestCard
              key={test.title}
              title={test.title}
              description={test.description}
              icon={test.icon}
              onClick={() => navigate(test.path)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;