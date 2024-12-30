import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/10 to-transparent flex items-center justify-center">
      <div className="absolute inset-0 bg-grid-white/10" />
      
      <motion.div 
        className="relative text-center space-y-8 max-w-2xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Bienvenido a AutoTest
        </h1>
        
        <p className="text-lg text-gray-600">
          Tu plataforma de preparación para el examen de conducir
        </p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Button 
            size="lg"
            className="group relative overflow-hidden bg-primary text-white transition-all hover:scale-105 hover:shadow-lg"
            onClick={() => navigate("/index")}
          >
            <span className="relative z-10">Comenzar</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;