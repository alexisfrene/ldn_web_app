import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@services';
import { useSessionStore } from '@global';
import { Button, Input, Label, LoadingIndicator } from '@components';

export const LoginUserForm: React.FC = () => {
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

  return (
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
        <Button type="submit" disabled={formik.isSubmitting}>
          Iniciar sesión
        </Button>
      </div>
      <LoadingIndicator isLoading={formik.isSubmitting} />
    </form>
  );
};
