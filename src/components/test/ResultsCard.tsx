import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, RotateCcw, List, Share2, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface ResultsCardProps {
  correctAnswers: number;
  totalQuestions: number;
  onReviewAnswers: () => void;
  onRetryTest: () => void;
  onBackToSelector: () => void;
  onShare: () => void;
  previousBestScore?: number;
  categoryPerformance?: Record<string, number>;
}

export function ResultsCard({
  correctAnswers,
  totalQuestions,
  onReviewAnswers,
  onRetryTest,
  onBackToSelector,
  onShare,
  previousBestScore,
  categoryPerformance,
}: ResultsCardProps) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const isPassed = percentage >= 90;
  const improvement = previousBestScore ? percentage - previousBestScore : 0;

  const pieData = [
    {
      name: "Correctas",
      value: correctAnswers,
    },
    {
      name: "Incorrectas",
      value: totalQuestions - correctAnswers,
    },
  ];

  const categoryData = categoryPerformance
    ? Object.entries(categoryPerformance).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  const COLORS = ["#22C55E", "#EF4444"];

  return (
    <Card className="w-full max-w-4xl animate-fade-in p-8">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold">
          {isPassed ? "¡Felicidades! 🎉" : "¡Sigue practicando! 💪"}
        </h2>
        <p className="text-lg text-gray-600">
          Has respondido correctamente el {percentage}% de las preguntas
        </p>
        {improvement > 0 && (
          <div className="mt-4 flex items-center justify-center gap-2 text-green-500">
            <TrendingUp className="h-5 w-5" />
            <span className="font-medium">¡Has mejorado un {improvement}% respecto a tu mejor marca!</span>
          </div>
        )}
        {isPassed && (
          <div className="mt-4 flex items-center justify-center gap-2 text-yellow-500">
            <Trophy className="h-6 w-6 animate-bounce" />
            <span className="font-medium">¡Logro desbloqueado: Test superado!</span>
          </div>
        )}
      </div>

      <div className="mb-8 grid gap-8 md:grid-cols-2">
        <div className="h-64">
          <h3 className="mb-4 text-lg font-semibold">Resumen de Respuestas</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {categoryPerformance && (
          <div className="h-64">
            <h3 className="mb-4 text-lg font-semibold">Rendimiento por Categoría</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="value" fill="#2563EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <Button
          variant="outline"
          className="gap-2"
          onClick={onReviewAnswers}
        >
          <List className="h-4 w-4" />
          Revisar respuestas
        </Button>
        <Button
          variant="outline"
          className="gap-2"
          onClick={onRetryTest}
        >
          <RotateCcw className="h-4 w-4" />
          Repetir test
        </Button>
        <Button
          variant="outline"
          className="gap-2"
          onClick={onShare}
        >
          <Share2 className="h-4 w-4" />
          Compartir resultado
        </Button>
        <Button
          className="gap-2"
          onClick={onBackToSelector}
        >
          Más tests
        </Button>
      </div>
    </Card>
  );
}