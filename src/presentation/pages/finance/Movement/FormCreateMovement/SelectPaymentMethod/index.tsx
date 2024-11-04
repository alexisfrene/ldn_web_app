import React, { useState } from 'react';
import { FormikValues, useFormikContext } from 'formik';
import { useQuery } from '@tanstack/react-query';
import { getAllPaymentMethodForAccount } from '@services';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
  ScrollArea,
} from '@components';

export const SelectPaymentMethod: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<FormikValues>();
  const [selectedMethodId, setSelectedMethodId] = useState<number | null>(null);

  const { data: paymentMethods, error } = useQuery({
    queryKey: ['finances', 'payment_method', values.financial_accounts_id],
    queryFn: () => {
      if (values.financial_accounts_id) {
        return getAllPaymentMethodForAccount(values.financial_accounts_id);
      }
      return [];
    },
    enabled: Boolean(values.financial_accounts_id),
    staleTime: 0,
  });

  if (error) {
    return (
      <div>Error: {(error as Error).message || 'An error has occurred'}</div>
    );
  }

  const handleSelectMethod = (paymentMethodId: number) => {
    setFieldValue('payment_method_id', paymentMethodId);
    setSelectedMethodId(paymentMethodId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={!values.financial_accounts_id}
        >
          Selecciona un método de pago
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Elije un método de pago:</DialogTitle>
          <DialogDescription>Elegir uno :</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96">
          {paymentMethods?.length ? (
            paymentMethods?.map(
              (method: { name: string; payment_method_id: number }) => (
                <div
                  key={method.payment_method_id}
                  className={`mb-2 cursor-pointer rounded-md p-2 ${
                    selectedMethodId === method.payment_method_id
                      ? 'bg-blue-300 dark:bg-slate-700'
                      : 'bg-gray-200 hover:bg-gray-300 dark:bg-slate-900 dark:hover:bg-slate-800'
                  }`}
                  onClick={() => handleSelectMethod(method.payment_method_id)}
                >
                  {method.name}
                </div>
              ),
            )
          ) : (
            <div>
              <Label>
                Es cuenta no tiene ningún método de pago asignado ....
              </Label>
            </div>
          )}
        </ScrollArea>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
