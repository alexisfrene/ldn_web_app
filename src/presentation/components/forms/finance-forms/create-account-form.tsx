import React from 'react';
import { Formik } from 'formik';
import {
  Button,
  Icons,
  InputWithLabel,
  DialogClose,
  DialogFooter,
} from '@components';
import { PaymentMethodCheckbox } from '@selects';
import { useCreateAccount } from '@hooks';

export const FormCreateAccount: React.FC = () => {
  const mutation = useCreateAccount();
  return (
    <Formik
      initialValues={{
        account: '',
        payment_method: [] as number[],
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          mutation.mutate({
            account: values.account,
            payment_method: values.payment_method,
          });
        } finally {
          setSubmitting(false);
          resetForm();
        }
      }}
    >
      {({ handleSubmit, isSubmitting, values }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <InputWithLabel
              label="Nombre de la cuenta"
              name="account"
              placeholder='Ej: "Cuenta de ahorros"'
            />
          </div>
          <PaymentMethodCheckbox />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" type="button">
                Cancelar
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  values.account === '' ||
                  values.payment_method.length === 0
                }
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Icons type="refresh" className="h-5 w-5 animate-spin" />
                    <span>Creando cuenta...</span>
                  </div>
                ) : (
                  'Crear cuenta'
                )}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      )}
    </Formik>
  );
};
