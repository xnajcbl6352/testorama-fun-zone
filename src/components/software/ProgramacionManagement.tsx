import { ClassScheduler } from "./calendar/ClassScheduler";
import { useSession } from "@supabase/auth-helpers-react";

export function ProgramacionManagement() {
  const session = useSession();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <h2 className="text-2xl font-bold">Inicia sesión para ver el calendario</h2>
        <p className="text-muted-foreground">
          Necesitas iniciar sesión para acceder a la programación de clases
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ClassScheduler />
    </div>
  );
}