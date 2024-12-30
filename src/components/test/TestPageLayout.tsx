import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TimerDialog } from "@/components/TimerDialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface TestPageLayoutProps {
  title: string;
  icon: LucideIcon;
  difficulty: "Fácil" | "Intermedio" | "Avanzado";
  duration: string;
  description: string;
  benefits: { icon: string; text: string }[];
  steps: string[];
  children?: React.ReactNode;
}

export function TestPageLayout({
  title,
  icon: Icon,
  difficulty,
  duration,
  description,
  benefits,
  steps,
  children,
}: TestPageLayoutProps) {
  const [showTimerDialog, setShowTimerDialog] = useState(false);
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil":
        return "bg-green-100 text-green-800";
      case "Intermedio":
        return "bg-blue-100 text-blue-800";
      case "Avanzado":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStartTest = () => {
    setShowTimerDialog(true);
  };

  const handleSelectDuration = (duration: number | null) => {
    // Here you would start the test with the selected duration
    console.log("Starting test with duration:", duration);
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <div className="flex gap-2">
              <Badge variant="secondary" className={getDifficultyColor(difficulty)}>
                {difficulty}
              </Badge>
              <Badge variant="outline">{duration}</Badge>
            </div>
          </div>
        </div>
        <p className="text-lg text-gray-600 mb-6">{description}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Beneficios y Características</h2>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-xl">{benefit.icon}</span>
                  <span>{benefit.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Pasos</h2>
            <ol className="space-y-3 list-decimal list-inside">
              {steps.map((step, index) => (
                <li key={index} className="text-gray-600">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          {children}
          <Button
            size="lg"
            className="w-full max-w-md text-lg"
            onClick={handleStartTest}
          >
            Iniciar Test
          </Button>
        </div>
      </div>

      <TimerDialog
        open={showTimerDialog}
        onOpenChange={setShowTimerDialog}
        onSelectDuration={handleSelectDuration}
      />
    </div>
  );
}