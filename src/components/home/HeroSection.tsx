import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="hero-gradient animate-fade-in px-6 py-24">
      <div className="container mx-auto text-center">
        <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
          Domina el examen DGT con
          <span className="text-primary"> tests personalizados</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          Prepárate para tu examen teórico con nuestra colección completa de
          tests adaptados a tu nivel y necesidades
        </p>
        
        <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="group relative w-full overflow-hidden bg-primary text-white transition-all hover:scale-105 hover:shadow-lg sm:w-auto"
            onClick={() => navigate("/login")}
          >
            <span className="relative z-10">Inicia sesión para guardar tu progreso</span>
            <div className="absolute inset-0 bg-primary/10 transition-transform duration-300 group-hover:scale-x-100" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="group w-full border-2 border-primary/20 bg-white transition-all hover:scale-105 hover:border-primary hover:shadow-lg sm:w-auto"
            onClick={() => navigate("/register")}
          >
            <span>Descubre más tipos de test</span>
          </Button>
        </div>
      </div>
    </div>
  );
}