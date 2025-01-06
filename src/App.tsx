import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Index } from "@/pages/Index";
import { Login } from "@/pages/Login";
import { StudentDashboard } from "@/components/student/StudentDashboard";
import SoftwareManagement from "@/pages/SoftwareManagement";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TestSimple from "@/pages/TestSimple";
import TestTematico from "@/pages/TestTematico";
import TestGamificado from "@/pages/TestGamificado";
import TestAdaptativo from "@/pages/TestAdaptativo";
import TestFallos from "@/pages/TestFallos";
import TestSimulado from "@/pages/TestSimulado";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/software" element={<SoftwareManagement />} />
            <Route path="/test/simple" element={<TestSimple />} />
            <Route path="/test/tematico" element={<TestTematico />} />
            <Route path="/test/gamificado" element={<TestGamificado />} />
            <Route path="/test/adaptativo" element={<TestAdaptativo />} />
            <Route path="/test/fallos" element={<TestFallos />} />
            <Route path="/test/simulado" element={<TestSimulado />} />
          </Routes>
          <Toaster />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}