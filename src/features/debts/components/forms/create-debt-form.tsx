import React from "react";
import { Formik } from "formik";
import { paymentFrequency } from "src/mocks";
import { useCreateDebt } from "@features/debts/hooks/use-create-debt";
import { CalculateInterest } from "@common/CalculateInterest";
import { CounterButton } from "@common/CounterButton";
import { DropdownInput } from "@common/DropDown";
import { GenerateInstallments } from "@common/GenerateInstallments";
import { Icons } from "@common/Icons";
import { InputWithLabel } from "@common/InputWithLabel";
import { Button } from "@ui/button";
import { DialogClose, DialogFooter } from "@ui/dialog";
import { Label } from "@ui/label";
import { ScrollArea } from "@ui/scroll-area";
import { debtSchema, initialValuesDebt } from "./create-debt-utils";

export const CreateDebtForm: React.FC = () => {
  const mutation = useCreateDebt();

  return (
    <Formik
      initialValues={initialValuesDebt}
      validationSchema={debtSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          mutation.mutate({
            minimum_payment: values.minimum_payment,
            name: values.name,
            payment_frequency: values.payment_frequency,
            installments: values.installments,
            notes: values.notes,
            money_to_receive: values.money_to_receive,
          });
        } finally {
          setSubmitting(false);
          resetForm();
        }
      }}
    >
      {({ handleSubmit, isSubmitting, values, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-96">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              <InputWithLabel
                label="Nombre de la cuenta"
                name="name"
                className="col-span-full"
              />
              <InputWithLabel
                label="Nota"
                name="notes"
                textarea
                className="col-span-full"
              />
              <DropdownInput
                title="Frecuencia de pago"
                options={paymentFrequency}
                name="payment_frequency"
              />
              <InputWithLabel
                label="Monto a recibir"
                name="money_to_receive"
                type="number"
                min={1}
                step="0.01"
              />
              <InputWithLabel
                label="Pago mínimo"
                name="minimum_payment"
                type="number"
                min={1}
                step="0.01"
              />
              <div className="flex flex-col gap-4">
                <Label>Total de cuotas: </Label>
                <CounterButton
                  onDecrease={(value) => setFieldValue("number_quota", value)}
                  onIncrease={(value) => setFieldValue("number_quota", value)}
                  defaultValue={values.number_quota}
                  max={72}
                  min={1}
                />
              </div>
              <InputWithLabel
                label="Total a pagar "
                name="total_debt_str"
                min={1}
                disabled
                step="0.01"
              />
              <CalculateInterest
                totalAmountToPay={values.total_debt}
                amountReceived={values.money_to_receive}
                numberOfInstallments={values.number_quota}
              />
            </div>
            <GenerateInstallments />
          </ScrollArea>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <Icons type="refresh" className="h-5 w-5 animate-spin" />
                  <span>Creando cuenta...</span>
                </div>
              ) : (
                "Crear cuenta"
              )}
            </Button>
          </DialogFooter>
        </form>
      )}
    </Formik>
  );
};
