import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterUserForm } from "@forms";
import { Card, CardContent, CardDescription, CardHeader } from "@ui/card";
import { Particles } from "@ui/particles";
import { useTheme } from "@common/ThemeProvider";

const SingUpPage: React.FC = () => {
  const [color, setColor] = useState("#ffffff");
  const { theme } = useTheme();
  const navigate = useNavigate();
  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  return (
    <Card className="min-h-screen border-none px-3 shadow-none lg:px-10 xl:px-20 2xl:px-40">
      <CardHeader className="text-center text-2xl">Crea una cuenta</CardHeader>
      <CardDescription className="mb-3 text-center">
        ¿Ya tienes cuenta?
        <b
          className="mx-3 cursor-pointer text-blue-600 hover:text-blue-500"
          onClick={() => navigate("/login")}
        >
          Ingresa desde aquí.
        </b>
      </CardDescription>
      <CardContent>
        <Particles
          className="absolute inset-0 z-0"
          quantity={100}
          ease={80}
          color={color}
          refresh
        />
        <RegisterUserForm />
      </CardContent>
    </Card>
  );
};

export default SingUpPage;
