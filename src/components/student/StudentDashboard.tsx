import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  CreditCard, 
  GraduationCap, 
  LogOut, 
  BookOpen,
  Trophy,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useClasses } from "@/hooks/useClasses";
import { ClassBookingDialog } from "./ClassBookingDialog";
import { StudentProgress } from "./StudentProgress";
import { type Class } from "@/types/class";
import { useNavigate } from "react-router-dom";
import { AchievementsDisplay } from "../dashboard/AchievementsDisplay";
import { LearningPathView } from "../dashboard/LearningPathView";
import { Badge } from "@/components/ui/badge";

interface StudentStats {
  totalClasses: number;
  completedModules: number;
  totalPoints: number;
}

export function StudentDashboard() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { loadClasses } = useClasses();
  const [upcomingClasses, setUpcomingClasses] = useState<Class[]>([]);
  const [showBooking, setShowBooking] = useState(false);
  const [stats, setStats] = useState<StudentStats>({
    totalClasses: 0,
    completedModules: 0,
    totalPoints: 0
  });

  useEffect(() => {
    if (!session) {
      navigate("/login");
      return;
    }

    const loadStudentData = async () => {
      try {
        // Load upcoming classes
        const classes = await loadClasses();
        const upcoming = classes.filter(
          (c) => new Date(c.date + "T" + c.start_time) > new Date()
        );
        setUpcomingClasses(upcoming);

        // Load student stats
        const { data: profileData } = await supabase
          .from("student_profiles")
          .select("points")
          .eq("id", session.user.id)
          .single();

        const { count: classesCount } = await supabase
          .from("classes")
          .select("*", { count: 'exact', head: true })
          .eq("student_id", session.user.id);

        const { data: learningPath } = await supabase
          .from("learning_paths")
          .select("completed_modules")
          .eq("student_id", session.user.id)
          .single();

        setStats({
          totalClasses: classesCount || 0,
          completedModules: learningPath?.completed_modules?.length || 0,
          totalPoints: profileData?.points || 0
        });

      } catch (error: any) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los datos del estudiante",
          variant: "destructive",
        });
      }
    };

    loadStudentData();
  }, [session, loadClasses, supabase, navigate, toast]);

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

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clases</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClasses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Módulos Completados</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedModules}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Puntos Totales</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPoints}</div>
          </CardContent>
        </Card>
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
                      <Badge variant="secondary">
                        {class_.type}
                      </Badge>
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
        onBookingComplete={() => loadClasses()}
      />
    </div>
  );
}