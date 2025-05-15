import React from "react";
import { Formik } from "formik";
import { toast } from "sonner";
import { Button } from "@ui/button";
import { InputWithVerifyPassword } from "@ui/input";
import { Label } from "@ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import { InputWithLabel } from "@components/common/input-with-label";
import { registerUser } from "@users-services/index";

export const RegisterUserForm: React.FC = () => {
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    gender: "",
    birthday_date: "",
    username: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, formikHelpers) => {
        const res = await registerUser(values);
        if (res?.status === 201) {
          toast("Usuario creado exitosamente!");
          return formikHelpers.resetForm();
        } else {
          toast.error("Error al crear el usuario");
        }
      }}
    >
      {({ values, handleChange, handleSubmit, setFieldValue }) => (
        <form
          onSubmit={handleSubmit}
          className="gap-x-3 gap-y-5 sm:m-10 md:grid md:grid-cols-2"
        >
          <InputWithLabel
            label="Nombre de usuario"
            name="username"
            placeholder="Ej : juanperez30"
            max={15}
            min={3}
          />
          <InputWithLabel
            label="Nombre"
            name="first_name"
            placeholder="Ej : Juan"
            max={15}
            min={3}
          />
          <InputWithLabel
            label="Apellido"
            name="last_name"
            placeholder="Ej : Perez"
            max={15}
            min={3}
          />
          <InputWithLabel
            label="Email"
            name="email"
            placeholder="Ej : juanperez@gmail.com"
            type="email"
            max={50}
            min={3}
          />
          <div className="mb-3 flex flex-col">
            <Label htmlFor="gender" className="mb-1.5">
              Genero
            </Label>
            <Select
              name="gender"
              onValueChange={(value) => setFieldValue("gender", value)}
              value={values.gender}
            >
              <SelectTrigger className="w-full">
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
          </div>
          <InputWithLabel
            label="Fecha de nacimiento"
            name="birthday_date"
            type="date"
            placeholder="Ej : 2000-01-01"
          />
          <div>
            <Label className="col-span-1 my-1.5" htmlFor="password">
              Contraseña
            </Label>
            <InputWithVerifyPassword onChange={handleChange} />
          </div>
          <Button
            className="col-span-2 mt-5 w-full"
            type="submit"
            disabled={!values.gender}
          >
            Registrar
          </Button>
        </form>
      )}
    </Formik>
  );
};
