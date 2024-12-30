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
    <Card className="w-full max-w-3xl animate-fade-in p-8">
      <h2 className="mb-8 text-center text-2xl font-bold leading-relaxed text-foreground">
        {question}
      </h2>
      
      <div className="grid gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            className={cn(
              "group relative overflow-hidden rounded-xl border-2 border-transparent bg-white p-6 text-lg font-medium shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-primary/20 hover:shadow-lg dark:bg-gray-800",
              selectedOption === index && "selected border-primary bg-primary/5",
              showFeedback && correctOption === index && "correct border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300",
              showFeedback && selectedOption === index && correctOption !== index && "incorrect border-red-500 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300"
            )}
            onClick={() => !showFeedback && onSelectOption(index)}
            disabled={showFeedback}
          >
            <span className="relative z-10">{option}</span>
            
            <div className="feedback absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-0 transition-opacity group-[.correct]:opacity-100 group-[.incorrect]:opacity-100">
              {showFeedback && (
                correctOption === index ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  selectedOption === index && <X className="h-5 w-5 text-red-500" />
                )
              )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        ))}
      </div>

      {showFeedback && explanation && (
        <p className="mt-6 text-center text-sm text-muted-foreground animate-fade-in">
          {explanation}
        </p>
      )}
    </Card>
  );
}