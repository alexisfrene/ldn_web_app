import React from 'react';
import { Formik } from 'formik';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownInput,
  Icons,
  LabelInput,
  ScrollArea,
} from '@components';
import { Installments } from './Installments';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDebt } from '@services';
import { paymentFrequency } from '@presentation/mocks';
import { initialValues } from './initialValues';
import { debtSchema } from './validations';
import { CalculateInterest } from '../CalculateInterest';

export const FormCreateDebt: React.FC = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createDebt,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['debts'],
      });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-3">
          Crear nueva deuda
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[80vh] max-w-5xl">
        <DialogHeader>
          <DialogTitle>Crear nueva cuenta financiera :</DialogTitle>
          <DialogDescription>
            Aquí puede crear una nueva cuenta financiera.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
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
                total_debt: values.total_debt,
                money_to_receive: values.money_to_receive,
              });
            } finally {
              setSubmitting(false);
              resetForm();
            }
          }}
        >
          {({ handleSubmit, isSubmitting, values }) => (
            <form onSubmit={handleSubmit}>
              <ScrollArea className="h-[60vh]">
                <div className="grid grid-cols-3 gap-3">
                  <LabelInput label="Nombre de la cuenta" name="name" />
                  <LabelInput label="Agrega un nota de la deuda" name="notes" />
                  <div className="-mt-1.5">
                    <DropdownInput
                      title="Elegir una frecuencia de pago"
                      options={paymentFrequency}
                      name="payment_frequency"
                    />
                  </div>
                  <LabelInput
                    label="Monto a recibir"
                    name="money_to_receive"
                    inputType="number"
                    min={1}
                    step="0.01"
                  />
                  <LabelInput
                    label="Cuanto es el total a pagar ?"
                    name="total_debt"
                    inputType="number"
                    min={1}
                    step="0.01"
                  />
                  <CalculateInterest
                    totalAmountToPay={values.total_debt}
                    amountReceived={values.money_to_receive}
                    numberOfInstallments={values.number_quota}
                  />
                  <LabelInput
                    label="Total de cuotas"
                    name="number_quota"
                    inputType="number"
                    min={1}
                    max={72}
                  />
                  <LabelInput
                    label="Que cuota vas ?"
                    name="current_quota"
                    inputType="number"
                    min={1}
                  />
                  <LabelInput
                    label="Pago mínimo"
                    name="minimum_payment"
                    inputType="number"
                    min={1}
                    step="0.01"
                  />
                </div>
                <Installments />
              </ScrollArea>
              <div className="col-span-full mt-6 flex justify-center gap-3">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full max-w-sm rounded-lg px-6 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full max-w-sm rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:text-black"
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
              </div>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
