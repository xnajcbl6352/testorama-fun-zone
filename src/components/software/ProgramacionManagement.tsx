import { ClassScheduler } from "./calendar/ClassScheduler";
import { useSession } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Calendar, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function ProgramacionManagement() {
  const session = useSession();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/software'
      }
    });
  };

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6 p-8">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-2">
          <Calendar className="w-8 h-8 text-blue-500" />
        </div>
        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl font-bold text-gray-900">Inicia sesión para ver el calendario</h2>
          <p className="text-muted-foreground">
            Necesitas iniciar sesión para acceder a la programación de clases y gestionar tus horarios
          </p>
        </div>
        <Button onClick={handleLogin} size="lg" className="gap-2">
          <LogIn className="w-4 h-4" />
          Iniciar Sesión
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ClassScheduler />
    </div>
  );
}