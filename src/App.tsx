import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import TestSimple from "./pages/TestSimple";
import TestTematico from "./pages/TestTematico";
import TestGamificado from "./pages/TestGamificado";
import TestAdaptativo from "./pages/TestAdaptativo";
import TestFallos from "./pages/TestFallos";
import TestSimulado from "./pages/TestSimulado";
import SoftwareManagement from "./pages/SoftwareManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/test/simple" element={<TestSimple />} />
            <Route path="/test/tematico" element={<TestTematico />} />
            <Route path="/test/gamificado" element={<TestGamificado />} />
            <Route path="/test/adaptativo" element={<TestAdaptativo />} />
            <Route path="/test/fallos" element={<TestFallos />} />
            <Route path="/test/simulado" element={<TestSimulado />} />
            <Route path="/software" element={<SoftwareManagement />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;