import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '@services';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Input,
  InputWithVerifyPassword,
  Label,
  Layout,
  Particles,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  useTheme,
} from '@components';

const SingUpPage: React.FC = () => {
  const [color, setColor] = useState('#ffffff');
  const { theme } = useTheme();
  const navigate = useNavigate();
  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    gender: '',
    birthday_date: '',
    username: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async ({ passwordConfirm, ...values }, formikHelpers) => {
      const res = await registerUser(values);
      if (res?.status === 201) {
        toast('Usuario creado exitosamente!');
        return formikHelpers.resetForm();
      } else {
        alert('Error');
      }
    },
  });
  useEffect(() => {
    setColor(theme === 'dark' ? '#ffffff' : '#000000');
  }, [theme]);

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="text-center text-2xl">Crea una cuenta</CardHeader>
      <CardDescription className="mb-3 text-center">
        ¿Ya tienes cuenta?
        <b
          className="mx-3 cursor-pointer text-blue-600 hover:text-blue-500"
          onClick={() => navigate('/login')}
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
        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-2 gap-x-3 gap-y-5 sm:m-10"
        >
          <Label htmlFor="username" className="col-span-1">
            Nombre de la cuenta
            <Input
              name="username"
              id="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              placeholder="Ej : juanperez30"
              minLength={3}
              maxLength={15}
            />
          </Label>
          <Label htmlFor="first_name" className="col-span-1">
            Nombre
            <Input
              name="first_name"
              id="first_name"
              onChange={formik.handleChange}
              value={formik.values.first_name}
              placeholder="Ej : Juan"
              minLength={3}
              maxLength={15}
            />
          </Label>
          <Label htmlFor="last_name" className="col-span-1">
            Apellido
            <Input
              name="last_name"
              id="last_name"
              onChange={formik.handleChange}
              value={formik.values.last_name}
              placeholder="Ej : Perez"
              minLength={3}
              maxLength={15}
            />
          </Label>
          <Label htmlFor="email" className="col-span-1">
            Email
            <Input
              name="email"
              id="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Ej : juanperez@gmail.com"
              type="email"
              minLength={3}
              maxLength={50}
            />
          </Label>
          <Label htmlFor="gender" className="col-span-1">
            Genero
            <Select
              name="gender"
              onValueChange={(value) => formik.setFieldValue('gender', value)}
              value={formik.values.gender}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Géneros</SelectLabel>
                  <SelectItem value="male">Hombre</SelectItem>
                  <SelectItem value="female">Mujer</SelectItem>
                  <SelectItem value="unspecified">No especificar</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Label>
          <Label htmlFor="date" className="col-span-1">
            Fecha de nacimiento
            <Input
              name="birthday_date"
              id="birthday_date"
              onChange={formik.handleChange}
              value={formik.values.birthday_date}
              type="date"
            />
          </Label>
          <Label className="col-span-1" htmlFor="password">
            Contraseña
            <InputWithVerifyPassword onChange={formik.handleChange} />
          </Label>
          <Button
            className="col-span-2 mt-5"
            type="submit"
            disabled={!formik.values.gender}
          >
            Registrar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SingUpPage;
