import React from "react";
import { Formik } from "formik";
import { Button } from "@ui/button";
import { InputWithLabel } from "@components/common/input-with-label";

export const ChangePasswordForm: React.FC = () => {
  return (
    <Formik
      initialValues={{
        last_password: "",
        new_password: "",
        confirm_password: "",
      }}
      onSubmit={() => {}}
    >
      {() => (
        <div className="flex flex-col">
          <InputWithLabel
            label="Contraseña actual"
            name="last_password"
            type="password"
          />
          <InputWithLabel
            label="Contraseña nueva"
            name="new_password"
            type="password"
          />
          <InputWithLabel
            label="Confirmar contraseña"
            name="confirm_password"
            type="password"
          />
          <Button>Guardar</Button>
        </div>
      )}
    </Formik>
  );
};
