import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, CreditCard, GraduationCap, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useClasses } from "@/hooks/useClasses";
import { ClassBookingDialog } from "./ClassBookingDialog";
import { StudentProgress } from "./StudentProgress";
import { type Class } from "@/types/class";
import { useNavigate } from "react-router-dom";
import { AchievementsDisplay } from "../dashboard/AchievementsDisplay";
import { LearningPathView } from "../dashboard/LearningPathView";

export function StudentDashboard() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { loadClasses } = useClasses();
  const [upcomingClasses, setUpcomingClasses] = useState<Class[]>([]);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      loadUpcomingClasses();
    }
  }, [session]);

  const loadUpcomingClasses = async () => {
    try {
      const classes = await loadClasses();
      const upcoming = classes.filter(
        (c) => new Date(c.date + "T" + c.start_time) > new Date()
      );
      setUpcomingClasses(upcoming);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar las clases",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Inicia sesión para continuar</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Panel del Alumno</h1>
        <div className="flex gap-4">
          <Button onClick={() => setShowBooking(true)} className="gap-2">
            <Calendar className="h-4 w-4" />
            Reservar Clase
          </Button>
          <Button variant="outline" onClick={handleSignOut} className="gap-2">
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <LearningPathView />
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Próximas Clases
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingClasses.length === 0 ? (
                <p className="text-muted-foreground">No hay clases programadas</p>
              ) : (
                <ul className="space-y-4">
                  {upcomingClasses.map((class_) => (
                    <li key={class_.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{new Date(class_.date).toLocaleDateString()}</p>
                        <p className="text-sm text-muted-foreground">
                          {class_.start_time.slice(0, 5)} - {class_.end_time.slice(0, 5)}
                        </p>
                      </div>
                      <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                        {class_.type}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <AchievementsDisplay />
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Progreso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StudentProgress />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Pagos Pendientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No hay pagos pendientes</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <ClassBookingDialog 
        open={showBooking} 
        onClose={() => setShowBooking(false)}
        onBookingComplete={loadUpcomingClasses}
      />
    </div>
  );
}