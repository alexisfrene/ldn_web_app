import React from "react";
import { Formik } from "formik";
import { Button } from "@ui/button";
import { DialogClose, DialogFooter } from "@ui/dialog";
import { Label } from "@ui/label";
import { LoadingButton } from "@ui/loading-button";
import { InputWithLabel } from "@components/common/input-with-label";
import { PaymentMethodCheckbox } from "@payment-methods-selects/checkbox-payment-method";
import { useEditAccount } from "@accounts-hooks/use-edit-account";
import { CheckAvailable } from "../common/check-available";

type Props = {
  name: string;
  financial_accounts_id: UUID;
  pays: number[];
};

export const EditAccountForm: React.FC<Props> = ({
  name,
  pays,
  financial_accounts_id,
}) => {
  const mutation = useEditAccount();
  return (
    <Formik
      initialValues={{
        account: name,
        payment_method: pays || [],
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          mutation.mutate({
            financial_account_id: financial_accounts_id,
            name: values.account || "",
            payments_methods: values.payment_method.map((e) => Number(e)),
          });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ handleSubmit, isSubmitting, values, errors }) => (
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-3">
            <InputWithLabel label="Nombre de la cuenta" name="account" />
            <CheckAvailable />
          </div>
          <Label className="font-semibold">Métodos de pago asociados:</Label>
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
                Editar cuenta
              </LoadingButton>
            </DialogClose>
          </DialogFooter>
        </form>
      )}
    </Formik>
  );
};
