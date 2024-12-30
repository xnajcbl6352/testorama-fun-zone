import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Review {
  id: number;
  name: string;
  age: number;
  location: string;
  image: string;
  text: string;
  rating: number;
  isTopReview?: boolean;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "José Manuel Almuñécar",
    age: 23,
    location: "Sevilla, España",
    image: "/lovable-uploads/3db97ccd-776c-4278-8d7d-5826fd382363.png",
    text: "Muy útil para mirar valoraciones y buscar autoescuelas cerca de ti",
    rating: 5,
    isTopReview: true,
  },
  {
    id: 2,
    name: "Ana Martínez",
    age: 27,
    location: "Madrid, España",
    image: "/placeholder.svg",
    text: "La mejor experiencia para prepararme para mi examen de conducción",
    rating: 5,
  },
  {
    id: 3,
    name: "Luis Fernández",
    age: 19,
    location: "Barcelona, España",
    image: "/placeholder.svg",
    text: "Muy práctica y fácil de usar, 100% recomendada",
    rating: 5,
  },
];

export function ReviewsSection() {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    // Update current slide index when it changes
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    // Auto-advance slides every 5 seconds
    const autoAdvance = setInterval(() => {
      api.scrollNext();
    }, 5000);

    // Cleanup
    return () => {
      clearInterval(autoAdvance);
      api.off("select");
    };
  }, [api]);

  return (
    <section className="bg-gradient-to-b from-white to-primary/5 py-24">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center animate-fade-in">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Opiniones de Nuestros Usuarios
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Descubre lo que otros dicen sobre nuestra app
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-4xl px-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
            className="mx-auto w-full"
          >
            <CarouselContent>
              {reviews.map((review) => (
                <CarouselItem key={review.id} className="transition-opacity duration-300">
                  <div className="relative mx-auto flex max-w-2xl flex-col items-center rounded-2xl bg-white p-8 text-center shadow-lg transition-all hover:shadow-xl">
                    {review.isTopReview && (
                      <span className="absolute -top-3 rounded-full bg-primary px-4 py-1 text-sm font-medium text-white">
                        Top Review
                      </span>
                    )}
                    
                    <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                      <AvatarImage src={review.image} alt={review.name} />
                      <AvatarFallback>
                        {review.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <h3 className="mt-6 text-xl font-semibold text-gray-900">
                      {review.name}, {review.age}
                    </h3>
                    <p className="text-sm text-gray-500">{review.location}</p>

                    <div className="mt-3 flex items-center justify-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    <p className="mt-4 text-lg italic text-gray-600">
                      "{review.text}"
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="border-primary/20 bg-white/80 hover:bg-white" />
            <CarouselNext className="border-primary/20 bg-white/80 hover:bg-white" />
          </Carousel>

          {/* Dots navigation */}
          <div className="mt-8 flex justify-center gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-all ${
                  current === index ? "bg-primary w-4" : "bg-gray-300"
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-primary text-white transition-all hover:scale-105 hover:shadow-lg"
              onClick={() => console.log("Dejar reseña")}
            >
              <span className="relative z-10">Dejar tu opinión</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}