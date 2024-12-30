import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TestTematico = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Test Temático</h1>
      <p className="mb-4">Esta página está en construcción.</p>
      <Button onClick={() => navigate("/")}>Volver al inicio</Button>
    </div>
  );
};

export default TestTematico;