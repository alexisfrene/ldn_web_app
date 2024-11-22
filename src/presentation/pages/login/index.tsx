import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@services';
import { useSessionStore } from '@global';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Layout,
} from '@components';

const LoginPage: React.FC = () => {
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
      alert('Error');
    },
  });
  return (
    <Layout>
      <Card className="border-none shadow-none dark:bg-slate-800 sm:mx-96 sm:mt-28 sm:bg-amber-100">
        <CardHeader>
          <CardTitle>Ingresar </CardTitle>
          <CardDescription>
            Proporcionar sus credenciales de acceso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Label>Correo electrónico o username</Label>
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
              onChange={formik.handleChange}
            />
            <Button type="submit" className="my-3">
              Iniciar sesión
            </Button>
          </form>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default LoginPage;
