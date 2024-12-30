import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: string;
  options: string[];
  selectedOption?: number;
  correctOption?: number;
  onSelectOption: (index: number) => void;
  showFeedback?: boolean;
  explanation?: string;
}

export function QuestionCard({
  question,
  options,
  selectedOption,
  correctOption,
  onSelectOption,
  showFeedback,
  explanation,
}: QuestionCardProps) {
  return (
    <Card className="w-full max-w-3xl animate-fade-in p-6">
      <h2 className="mb-6 text-xl font-bold leading-relaxed text-foreground">{question}</h2>
      <div className="grid gap-4">
        {options.map((option, index) => (
          <Button
            key={index}
            variant={selectedOption === index ? "default" : "outline"}
            className={cn(
              "h-auto min-h-[3rem] w-full justify-start p-4 text-left text-base",
              showFeedback && correctOption === index && "bg-green-500 text-white hover:bg-green-600",
              showFeedback && selectedOption === index && correctOption !== index && "bg-red-500 text-white hover:bg-red-600"
            )}
            onClick={() => !showFeedback && onSelectOption(index)}
            disabled={showFeedback}
          >
            {option}
          </Button>
        ))}
      </div>
      {showFeedback && (
        <div className="mt-6 flex items-start gap-2 rounded-lg bg-gray-50 p-4">
          {selectedOption === correctOption ? (
            <Check className="mt-1 h-5 w-5 shrink-0 text-green-500" />
          ) : (
            <X className="mt-1 h-5 w-5 shrink-0 text-red-500" />
          )}
          <div>
            <p className="font-medium">
              {selectedOption === correctOption ? "¡Correcto!" : "Incorrecto"}
            </p>
            {explanation && <p className="mt-1 text-sm text-gray-600">{explanation}</p>}
          </div>
        </div>
      )}
    </Card>
  );
}