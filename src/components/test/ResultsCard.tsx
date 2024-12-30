import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, RotateCcw, List } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface ResultsCardProps {
  correctAnswers: number;
  totalQuestions: number;
  onReviewAnswers: () => void;
  onRetryTest: () => void;
  onBackToSelector: () => void;
}

export function ResultsCard({
  correctAnswers,
  totalQuestions,
  onReviewAnswers,
  onRetryTest,
  onBackToSelector,
}: ResultsCardProps) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const isPassed = percentage >= 90; // DGT requires 90% to pass

  const chartData = [
    {
      name: "Correctas",
      value: correctAnswers,
      fill: "#22C55E",
    },
    {
      name: "Incorrectas",
      value: totalQuestions - correctAnswers,
      fill: "#EF4444",
    },
  ];

  return (
    <Card className="w-full max-w-3xl animate-fade-in p-6">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold">
          {isPassed ? "¡Felicidades!" : "¡Sigue practicando!"}
        </h2>
        <p className="text-lg text-gray-600">
          Has respondido correctamente el {percentage}% de las preguntas
        </p>
        {isPassed && (
          <div className="mt-4 flex items-center justify-center gap-2 text-yellow-500">
            <Trophy className="h-6 w-6" />
            <span className="font-medium">¡Logro desbloqueado: Test superado!</span>
          </div>
        )}
      </div>

      <div className="mb-8 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
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
          className="gap-2"
          onClick={onBackToSelector}
        >
          Más tests
        </Button>
      </div>
    </Card>
  );
}