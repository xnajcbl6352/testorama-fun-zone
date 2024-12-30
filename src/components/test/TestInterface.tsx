import { useState, useEffect } from "react";
import { QuestionCard } from "./QuestionCard";
import { ProgressBar } from "./ProgressBar";
import { Timer } from "../Timer";
import { ResultsCard } from "./ResultsCard";
import { X, ArrowRight, Trophy, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctOption: number;
  explanation: string;
  category?: string;
}

const mockQuestions: Question[] = [
  {
    id: 1,
    text: "¿Qué significa esta señal de tráfico?",
    options: ["Prohibido el paso", "Ceda el paso", "Paso obligatorio"],
    correctOption: 2,
    explanation: "Esta señal indica paso obligatorio en la dirección señalada.",
    category: "Señales",
  },
  // Add more questions as needed
];

interface TestInterfaceProps {
  type: "simple" | "tematico" | "gamificado" | "adaptativo" | "fallos" | "simulado";
  title: string;
  duration?: number;
}

export function TestInterface({ type, title, duration }: TestInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | undefined>();
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [streak, setStreak] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSelectOption = (index: number) => {
    setSelectedOption(index);
    setShowFeedback(true);
    
    if (index === mockQuestions[currentQuestion].correctOption) {
      setCorrectAnswers((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      
      if (streak >= 2) {
        toast({
          title: "¡Racha perfecta! 🔥",
          description: `Has acertado ${streak + 1} preguntas seguidas`,
        });
      } else {
        toast({
          title: "¡Correcto! ✨",
          description: "Sigue así, ¡vas muy bien!",
        });
      }
    } else {
      setStreak(0);
      toast({
        variant: "destructive",
        title: "¡Casi!",
        description: "No te preocupes, aprende del error y sigue adelante.",
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(undefined);
      setShowFeedback(false);
    } else {
      setIsTestComplete(true);
      if ((correctAnswers / mockQuestions.length) >= 0.9) {
        toast({
          title: "🏆 ¡Felicidades!",
          description: "Has superado el test con éxito.",
        });
      }
    }
  };

  const handleTimeUp = () => {
    setIsTestComplete(true);
    toast({
      variant: "destructive",
      title: "¡Tiempo agotado!",
      description: "No te preocupes, puedes intentarlo de nuevo.",
    });
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "Mi resultado en AutoTest",
        text: `¡He conseguido ${correctAnswers}/${mockQuestions.length} respuestas correctas en el test de conducir!`,
        url: window.location.href,
      });
    } catch (error) {
      toast({
        title: "Error al compartir",
        description: "No se pudo compartir el resultado.",
        variant: "destructive",
      });
    }
  };

  if (isTestComplete) {
    return (
      <ResultsCard
        correctAnswers={correctAnswers}
        totalQuestions={mockQuestions.length}
        onReviewAnswers={() => console.log("Review answers")}
        onRetryTest={() => window.location.reload()}
        onBackToSelector={() => navigate("/")}
        onShare={handleShare}
        previousBestScore={8} // Mock data, replace with real data
        categoryPerformance={{
          Señales: 85,
          Normativa: 70,
          Velocidad: 90,
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="fixed left-0 right-0 top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm dark:bg-gray-900/80">
        <div className="container flex items-center justify-between py-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {title}
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
            onClick={() => {
              const confirmExit = window.confirm("¿Estás seguro de que quieres salir? Perderás tu progreso.");
              if (confirmExit) navigate("/");
            }}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <ProgressBar
          current={currentQuestion + 1}
          total={mockQuestions.length}
          timeLeft={duration}
          totalTime={duration}
        />
      </header>

      <main className="container mt-32 animate-fade-in">
        {duration && (
          <Timer duration={duration} onTimeUp={handleTimeUp} />
        )}

        <QuestionCard
          question={mockQuestions[currentQuestion].text}
          options={mockQuestions[currentQuestion].options}
          selectedOption={selectedOption}
          correctOption={showFeedback ? mockQuestions[currentQuestion].correctOption : undefined}
          onSelectOption={handleSelectOption}
          showFeedback={showFeedback}
          explanation={showFeedback ? mockQuestions[currentQuestion].explanation : undefined}
        />

        {showFeedback && (
          <div className="mt-8 flex justify-end">
            <Button
              size="lg"
              onClick={handleNextQuestion}
              className="animate-fade-in group"
            >
              {currentQuestion < mockQuestions.length - 1 ? (
                <>
                  Siguiente Pregunta
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              ) : (
                "Finalizar Test"
              )}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}