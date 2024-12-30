import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { TestTypeCard } from "@/components/TestTypeCard";
import { Book, Brain, Trophy, BarChart3, FileQuestion, Clock } from "lucide-react";

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

export function MaterialDidacticoManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const testsFiltrados = testTypes.filter(test =>
    test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMaterial = () => {
    toast({
      title: "Función en desarrollo",
      description: "La funcionalidad para añadir material didáctico estará disponible próximamente.",
    });
  };

  const handleTestSelect = (path: string) => {
    toast({
      title: "Función en desarrollo",
      description: "La funcionalidad para acceder a los tests estará disponible próximamente.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Material Didáctico</h2>
        </div>
        <Button onClick={handleAddMaterial} className="gap-2">
          <Plus className="h-4 w-4" />
          Añadir Material
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          className="pl-10"
          placeholder="Buscar material didáctico..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {testsFiltrados.map((test) => (
          <TestTypeCard
            key={test.title}
            title={test.title}
            description={test.description}
            longDescription={test.longDescription}
            icon={test.icon}
            difficulty={test.difficulty}
            duration={test.duration}
            onClick={() => handleTestSelect(test.path)}
          />
        ))}
      </div>
    </div>
  );
}