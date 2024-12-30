import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Index } from "@/pages/Index";
import { Login } from "@/pages/Login";
import { StudentDashboard } from "@/components/student/StudentDashboard";
import SoftwareManagement from "@/pages/SoftwareManagement";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/software" element={<SoftwareManagement />} />
        </Routes>
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  );
}