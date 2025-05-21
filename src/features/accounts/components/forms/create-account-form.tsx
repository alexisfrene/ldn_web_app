import React from "react";
import { Formik } from "formik";
import { Button } from "@ui/button";
import { DialogClose, DialogFooter } from "@ui/dialog";
import { LoadingButton } from "@ui/loading-button";
import { InputWithLabel } from "@components/common/input-with-label";
import { PaymentMethodCheckbox } from "@payment-methods-selects/checkbox-payment-method";
import { useCreateAccount } from "@accounts-hooks/use-create-account";
import { CheckAvailable } from "@features/accounts/components/common/check-available";

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
              <LoadingButton
                type="submit"
                disabled={
                  isSubmitting ||
                  values.account === "" ||
                  values.payment_method.length === 0 ||
                  !!errors.account
                }
                loading={isSubmitting || mutation.isPending}
              >
                Crear cuenta
              </LoadingButton>
            </DialogClose>
          </DialogFooter>
        </form>
      )}
    </Formik>
  );
};
