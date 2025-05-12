import React from "react";
import { Formik } from "formik";
import { PaymentMethodCheckbox } from "@selects";
import { useEditAccount } from "@hooks/finance-hooks";
import { Icons } from "@common/Icons";
import { InputWithLabel } from "@common/InputWithLabel";
import { Button } from "@ui/button";
import { DialogClose, DialogFooter } from "@ui/dialog";
import { Label } from "@ui/label";

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
      {({ handleSubmit, isSubmitting, values }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <InputWithLabel label="Nombre de la cuenta" name="account" />
            <Label className="font-semibold">Métodos de pago asociados:</Label>
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
                  values.payment_method.length === 0
                }
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Icons type="refresh" className="h-5 w-5 animate-spin" />
                    <span>Editando cuenta...</span>
                  </div>
                ) : (
                  "Editar cuenta"
                )}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      )}
    </Formik>
  );
};
