import React, { useEffect, useState } from "react";
import { BorderBeam } from "@ui/border-beam";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { Particles } from "@ui/particles";
import { useTheme } from "@components/common2/theme-provider";
import { LoginUserForm } from "@components/forms/user-forms";

const LoginPage: React.FC = () => {
  const [color, setColor] = useState("#ffffff");
  const { theme } = useTheme();

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Particles
        className="absolute inset-0 z-0 bg-white dark:bg-background"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
      <Card className="relative w-[350px] overflow-hidden border-2 shadow-2xl">
        <CardHeader>
          <CardTitle>
            <div className="text-xl lg:text-3xl">Inicio de sesión</div>
          </CardTitle>
          <CardDescription className="mb-3 text-base">
            Ingrese sus credenciales para iniciar sesión
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginUserForm />
        </CardContent>
        <BorderBeam
          duration={8}
          size={100}
          colorTo="#f6f6f4"
          colorFrom="#2a2a27"
        />
      </Card>
    </div>
  );
};

export default LoginPage;
