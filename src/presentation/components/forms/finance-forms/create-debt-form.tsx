import React from 'react';
import { Formik } from 'formik';
import {
  Button,
  CounterButton,
  DialogClose,
  DialogFooter,
  DropdownInput,
  Icons,
  InputWithLabel,
  Label,
  ScrollArea,
  CalculateInterest,
  GenerateInstallments,
} from '@components';
import { paymentFrequency } from '@presentation/mocks';
import { initialValuesDebt, debtSchema } from './create-debt-utils';
import { useCreateDebt } from '@hooks';

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
            current_quota: values.current_quota,
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
              <InputWithLabel label="Nombre de la cuenta" name="name" />
              <InputWithLabel label="Agrega un nota de la deuda" name="notes" />
              <DropdownInput
                title="Elegir una frecuencia de pago"
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
                label="Que cuota vas ?"
                name="current_quota"
                type="number"
                min={1}
              />
              <InputWithLabel
                label="Pago mínimo"
                name="minimum_payment"
                type="number"
                min={1}
                step="0.01"
              />
              <div className="flex flex-col gap-2">
                <Label>Total de cuotas: </Label>
                <CounterButton
                  onDecrease={(value) => setFieldValue('number_quota', value)}
                  onIncrease={(value) => setFieldValue('number_quota', value)}
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
                'Crear cuenta'
              )}
            </Button>
          </DialogFooter>
        </form>
      )}
    </Formik>
  );
};
