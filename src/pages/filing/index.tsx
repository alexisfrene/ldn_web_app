import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStore } from "src/global";
import { Opulento, Velustro } from "uvcanvas";
import { useTheme } from "@common/ThemeProvider";
import { LoginUserForm } from "@components/forms/user-forms";
import { BorderBeam } from "@ui/border-beam";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { Particles } from "@ui/particles";

const Filing: React.FC = () => {
  const navigate = useNavigate();
  const sessionToken = useSessionStore((state) => state.session_token);
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) {
      setHasAnimated(true);
    }
  }, [hasAnimated]);
  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  useEffect(() => {
    if (sessionToken) {
      navigate("/app/finance");
    }
  }, [sessionToken, navigate]);

  return (
    <div className="grid lg:grid-cols-12">
      <div className="dark:bg-background relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-white lg:col-span-5">
        <div className="absolute top-1 left-1 mx-3">
          <div className="flex items-center space-x-3">
            <img src="/icon.png" className="rounded-7xl h-16 w-16" />
            <h1 className="flex pb-3 text-4xl font-bold tracking-tighter dark:text-white">
              Lo de
              <div className="to-error w-fit bg-linear-to-r from-amber-400 via-red-500 to-fuchsia-600 bg-clip-text px-2 pb-6 text-4xl font-black text-transparent dark:from-slate-500 dark:via-slate-400 dark:to-slate-200">
                Naty
              </div>
            </h1>
          </div>
        </div>
        <Particles
          className="absolute inset-0 z-0"
          quantity={100}
          ease={80}
          color={color}
          refresh
        />
        <div>
          <Card className="relative w-[350px] overflow-hidden border-2 shadow-2xl">
            <CardHeader>
              <CardTitle>
                <div className="text-xl lg:text-3xl">Inicio de sesión</div>
              </CardTitle>
              <CardDescription className="mb-3 lg:text-base">
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
      </div>
      <div className="hidden lg:col-span-7 lg:block">
        {theme !== "dark" ? <Velustro /> : <Opulento />}
      </div>
    </div>
  );
};

export default Filing;
