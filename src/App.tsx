import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider, useSession } from "@supabase/auth-helpers-react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Index } from "@/pages/Index";
import { Login } from "@/pages/Login";
import { StudentDashboard } from "@/components/student/StudentDashboard";
import { supabase } from "@/integrations/supabase/client";

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
        <Toaster />
      </ThemeProvider>
    </SessionContextProvider>
  );
}

export default App;