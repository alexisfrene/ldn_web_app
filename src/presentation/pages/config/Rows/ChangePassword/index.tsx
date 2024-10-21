import { Button, LabelInput } from '@components';
import { Formik } from 'formik';
import React from 'react';

export const ChangePassword: React.FC = () => {
  return (
    <Formik
      initialValues={{
        last_password: '',
        new_password: '',
        confirm_password: '',
      }}
      onSubmit={() => {}}
    >
      {() => (
        <div className="flex flex-col">
          <LabelInput
            label="Contraseña actual"
            name="last_password"
            inputType="password"
          />
          <LabelInput
            label="Contraseña nueva"
            name="new_password"
            inputType="password"
          />
          <LabelInput
            label="Confirmar contraseña"
            name="confirm_password"
            inputType="password"
          />
          <Button>Guardar</Button>
        </div>
      )}
    </Formik>
  );
};
