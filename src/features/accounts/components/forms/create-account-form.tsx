import React from "react";
import { Formik } from "formik";
import { useCreateAccount } from "@features/accounts/hooks/use-create-account";
import { PaymentMethodCheckbox } from "@features/payment-methods/components/selects/checkbox-payment-method";
import { CheckAvailable } from "@common/CheckAvailable";
import { Icons } from "@common/Icons";
import { InputWithLabel } from "@common/InputWithLabel";
import { Button } from "@ui/button";
import { DialogClose, DialogFooter } from "@ui/dialog";

export const FormCreateAccount: React.FC = () => {
  const mutation = useCreateAccount();

  return (
    <Formik
      initialValues={{
        account: "",
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
      {({ handleSubmit, isSubmitting, values, errors }) => (
        <form onSubmit={handleSubmit}>
          <div className="flex items-center">
            <InputWithLabel
              label="Nombre de la cuenta"
              name="account"
              placeholder='Ej: "Cuenta de ahorros"'
            />
            <CheckAvailable />
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
                  values.account === "" ||
                  values.payment_method.length === 0 ||
                  !!errors.account
                }
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Icons type="refresh" className="h-5 w-5 animate-spin" />
                    <span>Creando cuenta...</span>
                  </div>
                ) : (
                  "Crear cuenta"
                )}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      )}
    </Formik>
  );
};
