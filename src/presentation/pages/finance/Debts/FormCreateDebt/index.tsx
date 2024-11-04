import React from 'react';
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
import { Formik } from 'formik';

import { Installments } from './Installments';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDebt } from '@services';
import { paymentFrequency } from '@presentation/mocks';
import { initialValues } from './initialValues';

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
        <Button
          type="button"
          size="icon"
          className="bg-green-100 hover:bg-green-300 dark:bg-slate-600 dark:hover:bg-slate-500"
        >
          <Icons type="plus_circle" className="dark:text-slate-300" />
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
                interest_rate: values.interest_rate,
              });
            } finally {
              setSubmitting(false);
              resetForm();
            }
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <ScrollArea className="h-[60vh]">
                <div className="grid grid-cols-3 gap-3">
                  <LabelInput label="Nombre de la cuenta" name="name" />
                  <LabelInput
                    label="Interés"
                    name="interest_rate"
                    inputType="number"
                    min={1}
                    max={1000}
                  />
                  <LabelInput label="Agrega un nota de la deuda" name="notes" />
                  <LabelInput
                    label="Pago mínimo"
                    name="minimum_payment"
                    inputType="number"
                    min={1}
                  />
                  <LabelInput
                    label="Que cuota vas ?"
                    name="current_quota"
                    inputType="number"
                    min={1}
                  />
                  <LabelInput
                    label="Total de cuotas"
                    name="number_quota"
                    inputType="number"
                    min={1}
                    max={72}
                  />
                  <LabelInput
                    label="Cuanto es el total a pagar ?"
                    name="total_debt"
                    inputType="number"
                    min={1}
                  />
                  <div className="-mt-1.5">
                    <DropdownInput
                      title="Elegir una frecuencia de pago"
                      options={paymentFrequency}
                      name="payment_frequency"
                    />
                  </div>
                </div>
                <Installments />
              </ScrollArea>
              <div className="col-span-full mt-6 flex justify-center">
                <DialogClose asChild>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full max-w-sm rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:text-black"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <Icons
                          type="refresh"
                          className="h-5 w-5 animate-spin"
                        />
                        <span>Creando cuenta...</span>
                      </div>
                    ) : (
                      'Crear cuenta'
                    )}
                  </Button>
                </DialogClose>
              </div>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
