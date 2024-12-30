import { Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";
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
      <h2 className="mb-8 text-center text-2xl font-bold leading-relaxed text-foreground">
        {question}
      </h2>
      
      <div className="grid gap-4">
        {options.map((option, index) => (
          <div
            key={index}
            className={cn(
              "question-option",
              selectedOption === index && "selected",
              showFeedback && correctOption === index && "correct",
              showFeedback && selectedOption === index && correctOption !== index && "incorrect"
            )}
            onClick={() => !showFeedback && onSelectOption(index)}
          >
            {option}
            
            <div className="feedback">
              {showFeedback && (
                correctOption === index ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  selectedOption === index && <X className="h-5 w-5 text-red-500" />
                )
              )}
            </div>
          </div>
        ))}
      </div>

      {showFeedback && explanation && (
        <p className="mt-6 text-center text-sm text-gray-600">
          {explanation}
        </p>
      )}
    </Card>
  );
}