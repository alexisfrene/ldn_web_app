import React from "react";
import { Formik } from "formik";
import { formattedValue } from "@utils";
import { Button } from "@ui/button";
import { DialogFooter } from "@ui/dialog";
import { Label } from "@ui/label";
import { SelectFinancialAccount } from "@accounts-selects/select-financial-account";
import { SelectPaymentMethod } from "@payment-methods-selects/select-payment-method";
import { useMarkDebtPaid } from "@debts-hooks/use-mark-debt-paid";

interface Props {
  installment_id: number;
  amount: number;
  due_date: string;
  status: string;
  debt_id: string;
  debt_name: string;
}
export const MarkPaidFeeForm: React.FC<Props> = ({
  installment_id,
  amount,
  due_date,
  status,
  debt_id,
  debt_name,
}) => {
  const mutation = useMarkDebtPaid();
  return (
    <Formik
      initialValues={{
        financial_accounts_id: "" as UUID,
        total: 0,
        payment_method_id: null,
        value: amount,
        debt_id: debt_id as UUID,
        installment_id,
        debt_name,
      }}
      onSubmit={(values, formikHelpers) => {
        mutation.mutate({
          debt_id: values.debt_id,
          financial_accounts_id: values.financial_accounts_id,
          installment_id: values.installment_id,
          label: values.debt_name,
          payment_method_id: values.payment_method_id,
          value: values.value,
        });
        formikHelpers.resetForm();
      }}
    >
      {({ handleSubmit, isSubmitting, values }) => (
        <form onSubmit={handleSubmit}>
          <div>Monto : {formattedValue(amount)}</div>
          <div>
            Fecha de vencimiento :{" "}
            {new Date(
              new Date(due_date).toLocaleString("en-US", {
                timeZone: "UTC",
              }),
            ).toLocaleDateString()}
          </div>
          {status === "unpaid" && (
            <div>
              <div className="mt-3 gap-3 md:flex md:flex-col md:justify-between">
                <Label>Cuenta donde saldrá el dinero :</Label>
                <SelectFinancialAccount />
                <Label>Método de pago :</Label>
                <SelectPaymentMethod />
              </div>
              {values.total < values.value && values.financial_accounts_id && (
                <p className="text-rose-600">
                  No cuentas con el saldo suficiente , te faltan :
                  {formattedValue(values.total - values.value)}
                </p>
              )}

              <DialogFooter>
                <Button
                  disabled={
                    isSubmitting ||
                    values.total < values.value ||
                    !values.financial_accounts_id ||
                    !values.payment_method_id
                  }
                  type="submit"
                >
                  Pagar cuota
                </Button>
              </DialogFooter>
            </div>
          )}
        </form>
      )}
    </Formik>
  );
};
