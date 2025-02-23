import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Opulento, Velustro } from 'uvcanvas';
import { useFormik } from 'formik';
import { useSessionStore } from '@global';
import {
  AuroraText,
  BorderBeam,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  Input,
  Label,
  Particles,
  TextAnimate,
  useTheme,
} from '@components';
import { loginUser } from '@services';

const Filing: React.FC = () => {
  const navigate = useNavigate();
  const sessionToken = useSessionStore((state) => state.session_token);
  const { theme } = useTheme();
  const [color, setColor] = useState('#ffffff');
  const insertSessionToken = useSessionStore(
    (state) => state.insertSessionToken,
  );
  const formik = useFormik({
    initialValues: {
      email_or_user: '',
      password: '',
    },
    onSubmit: async (values, formikHelpers) => {
      const res = await loginUser(values);

      if (res?.data.session_token) {
        insertSessionToken(res?.data.session_token);
        return setTimeout(() => navigate('/app/finance'), 200);
      } else {
        formikHelpers.resetForm();
      }
    },
  });
  useEffect(() => {
    setColor(theme === 'dark' ? '#ffffff' : '#000000');
  }, [theme]);

  useEffect(() => {
    if (sessionToken) {
      navigate('/app/finance');
    }
  }, [sessionToken, navigate]);

  return (
    <div className="grid grid-cols-12">
      <div className="relative col-span-5 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-white dark:bg-background">
        <Particles
          className="absolute inset-0 z-0"
          quantity={100}
          ease={80}
          color={color}
          refresh
        />
        <div>
          <img src="/icon.png" className="rounded-7xl h-32 w-32" />
          <h1 className="pb-3 text-5xl font-bold tracking-tighter">
            Lo de <AuroraText className="py-3 pr-1">Naty</AuroraText>
          </h1>
          <Card className="relative w-[350px] overflow-hidden">
            <CardContent>
              <CardTitle>
                <TextAnimate animation="blurInUp" by="character" once>
                  Inicio de sesión
                </TextAnimate>
              </CardTitle>
              <CardDescription className="mb-3">
                Ingrese sus credenciales para iniciar sesión
              </CardDescription>
              <form onSubmit={formik.handleSubmit}>
                <Label>Email/Username</Label>
                <Input
                  id="email_or_user"
                  name="email_or_user"
                  placeholder="Ej : juanperez003"
                  value={formik.values.email_or_user}
                  onChange={formik.handleChange}
                />
                <Label>Contraseña</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  placeholder="********"
                  onChange={formik.handleChange}
                />
                <div className="mt-6 flex justify-between">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => navigate('/signup')}
                  >
                    Register
                  </Button>
                  <Button type="submit">Iniciar sesión</Button>
                </div>
              </form>
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
      <div className="col-span-7">
        {theme !== 'dark' ? <Velustro /> : <Opulento />}
      </div>
    </div>
  );
};

export default Filing;
