import React from "react";
import { Formik } from "formik";
import { cn, formattedValue } from "@utils";
import { SelectFinancialAccount } from "@features/accounts/components/selects/select-financial-account";
import { useMarkDebtPaid } from "@features/debts/hooks/use-mark-debt-paid";
import { SelectPaymentMethod } from "@features/payment-methods/components/selects/select-payment-method";
import { Button } from "@ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { Label } from "@ui/label";

interface Props {
  installment_id: number;
  quota_number: number;
  amount: number;
  due_date: string;
  status: string;
  debt_id: string;
  debt_name: string;
}

const statusColors = {
  paid: "bg-rose-600/60 dark:bg-red-950",
  pending:
    "bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-500 cursor-pointer delay-75",
};

export const CardFee: React.FC<Props> = ({
  installment_id,
  quota_number,
  amount,
  due_date,
  status,
  debt_id,
  debt_name,
}) => {
  const cardStatus = status === "paid" ? "paid" : "pending";
  const mutation = useMarkDebtPaid();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card key={installment_id} className={cn([statusColors[cardStatus]])}>
          <CardHeader>
            <CardTitle>Cuota número {quota_number + 1}</CardTitle>
            <CardDescription>
              {status === "paid" ? "Ya pagado" : "Sin Pagar"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label>Monto:</Label>
              <p>{formattedValue(amount)}</p>
            </div>
            <div className="flex items-center justify-between">
              <Label>Fecha de vencimiento:</Label>
              <p>
                {new Date(
                  new Date(due_date).toLocaleString("en-US", {
                    timeZone: "UTC",
                  }),
                ).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cuota número {quota_number + 1}</DialogTitle>
          <DialogDescription>
            Esta cuota se encenta con el estado de :
            <div className="text-lg font-semibold">
              {status === "paid" ? "Pagado" : "Sin pagar"}
            </div>
          </DialogDescription>
        </DialogHeader>
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
            <form onSubmit={handleSubmit} className="min-h-52">
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
                    <div className="items-center md:flex md:justify-between">
                      <Label>Cuenta donde saldrá el dinero :</Label>
                      <SelectFinancialAccount />
                    </div>
                    <div className="items-center md:flex md:justify-between">
                      <Label>Método de pago :</Label>
                      <SelectPaymentMethod />
                    </div>
                  </div>
                  {values.total < values.value &&
                    values.financial_accounts_id && (
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
                    >
                      Pagar cuota
                    </Button>
                  </DialogFooter>
                </div>
              )}
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
