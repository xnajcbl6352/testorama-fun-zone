import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, User } from "lucide-react";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary/10 to-transparent">
      <div className="absolute inset-0 bg-grid-white/10" />
      <div className="container relative mx-auto px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="animate-fade-in bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-extrabold leading-tight text-transparent sm:text-5xl lg:text-6xl">
            Domina el examen DGT con
            <span className="block text-primary"> tests personalizados</span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl animate-fade-in text-lg text-gray-600 [animation-delay:200ms]">
            Prepárate para tu examen teórico con nuestra colección completa de
            tests adaptados a tu nivel y necesidades. Aprende a tu ritmo y mejora tus resultados.
          </p>
          
          <div className="mt-10 flex animate-fade-in flex-col items-center justify-center gap-4 sm:flex-row [animation-delay:400ms]">
            <Button
              size="lg"
              className="group relative w-full overflow-hidden bg-primary text-white transition-all hover:scale-105 hover:shadow-lg sm:w-auto"
              onClick={() => navigate("/test/simple")}
            >
              <span className="relative z-10 flex items-center gap-2">
                Comenzar ahora
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="group w-full border-2 border-primary/20 bg-white/80 backdrop-blur-sm transition-all hover:scale-105 hover:border-primary hover:shadow-lg sm:w-auto"
              onClick={() => navigate("/software")}
            >
              Software de Gestión
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="group w-full bg-secondary/10 transition-all hover:scale-105 hover:shadow-lg sm:w-auto"
              onClick={() => navigate("/dashboard")}
            >
              <User className="mr-2 h-4 w-4" />
              Panel de Usuario
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}