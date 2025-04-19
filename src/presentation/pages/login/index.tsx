import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@services';
import { useSessionStore } from '@global';
import {
  BorderBeam,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  Input,
  Label,
  Particles,
  useTheme,
  LoadingIndicator,
  CardHeader,
} from '@components';

const LoginPage: React.FC = () => {
  const [color, setColor] = useState('#ffffff');
  const { theme } = useTheme();
  const navigate = useNavigate();
  const insertSessionToken = useSessionStore(
    (state) => state.insertSessionToken,
  );
  const formik = useFormik({
    initialValues: {
      email_or_user: '',
      password: '',
    },
    onSubmit: async (values) => {
      const res = await loginUser(values);

      if (res?.data.session_token) {
        insertSessionToken(res?.data.session_token);
        return setTimeout(() => navigate('/app/finance'), 200);
      }
    },
  });
  useEffect(() => {
    setColor(theme === 'dark' ? '#ffffff' : '#000000');
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
      <LoadingIndicator isLoading={formik.isSubmitting} />
    </div>
  );
};

export default LoginPage;
