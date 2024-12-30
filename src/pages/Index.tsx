import { Button } from "@/components/ui/button";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { TestTypesSection } from "@/components/home/TestTypesSection";
import { useNavigate } from "react-router-dom";

export function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <HeroSection />
      <FeaturesSection />
      <TestTypesSection />
      <ReviewsSection />
      
      <div className="container mx-auto px-4 py-16 text-center">
        <Button
          size="lg"
          className="bg-primary text-white hover:bg-primary/90 transition-colors"
          onClick={() => navigate("/software")}
        >
          Acceder al Software
        </Button>
      </div>
    </div>
  );
}