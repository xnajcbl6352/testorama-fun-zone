import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function Login() {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (session) {
      navigate("/dashboard");
    }
  }, [session, navigate]);

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Iniciar Sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#000',
                    brandAccent: '#666',
                  },
                },
              },
            }}
            providers={[]}
            redirectTo={`${window.location.origin}/dashboard`}
            onlyThirdPartyProviders={false}
            magicLink={false}
            showLinks={true}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Correo electrónico',
                  password_label: 'Contraseña',
                  button_label: 'Iniciar sesión',
                  email_input_placeholder: 'tu@email.com',
                  password_input_placeholder: 'Tu contraseña',
                },
                sign_up: {
                  email_label: 'Correo electrónico',
                  password_label: 'Contraseña',
                  button_label: 'Registrarse',
                  email_input_placeholder: 'tu@email.com',
                  password_input_placeholder: 'Tu contraseña',
                },
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}