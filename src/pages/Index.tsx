import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { TestTypesSection } from "@/components/home/TestTypesSection";
import { ThemeToggle } from "@/components/home/ThemeToggle";
import { TimerDialog } from "@/components/TimerDialog";
import { Timer } from "@/components/Timer";

const Index = () => {
  const navigate = useNavigate();
  const [showTimerDialog, setShowTimerDialog] = useState(false);
  const [selectedTestType, setSelectedTestType] = useState<string | null>(null);
  const [timerDuration, setTimerDuration] = useState<number | null>(null);

  const handleTestSelection = (path: string) => {
    setSelectedTestType(path);
    setShowTimerDialog(true);
  };

  const handleTimerSelection = (duration: number) => {
    setTimerDuration(duration);
    if (selectedTestType) {
      navigate(selectedTestType);
    }
  };

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <TestTypesSection onTestSelect={handleTestSelection} />
      <ThemeToggle />

      <TimerDialog
        open={showTimerDialog}
        onOpenChange={setShowTimerDialog}
        onSelectDuration={handleTimerSelection}
      />
      {timerDuration && (
        <Timer
          duration={timerDuration}
          onTimeUp={() => console.log("Time's up!")}
        />
      )}
    </div>
  );
};

export default Index;