import { useState } from "react";
import { QuestionCard } from "./QuestionCard";
import { ProgressBar } from "./ProgressBar";
import { Timer } from "../Timer";
import { ResultsCard } from "./ResultsCard";
import { X, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctOption: number;
  explanation: string;
}

// Mock data - replace with real data later
const mockQuestions: Question[] = [
  {
    id: 1,
    text: "¿Qué significa esta señal de tráfico?",
    options: ["Prohibido el paso", "Ceda el paso", "Paso obligatorio"],
    correctOption: 2,
    explanation: "Esta señal indica paso obligatorio en la dirección señalada.",
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
  const navigate = useNavigate();

  const handleSelectOption = (index: number) => {
    setSelectedOption(index);
    setShowFeedback(true);
    if (index === mockQuestions[currentQuestion].correctOption) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(undefined);
      setShowFeedback(false);
    } else {
      setIsTestComplete(true);
    }
  };

  const handleTimeUp = () => {
    setIsTestComplete(true);
  };

  const handleExit = () => {
    const confirmExit = window.confirm("¿Estás seguro de que quieres salir? Perderás tu progreso.");
    if (confirmExit) {
      navigate("/");
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