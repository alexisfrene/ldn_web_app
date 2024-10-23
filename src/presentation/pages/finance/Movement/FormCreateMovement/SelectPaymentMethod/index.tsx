import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import { useQuery } from '@tanstack/react-query';
import { getAllPaymentMethod } from '@services';
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
  LoadingIndicator,
  ScrollArea,
} from '@components';

export const SelectPaymentMethod: React.FC = () => {
  const { setFieldValue } = useFormikContext();
  const [selectedMethodId, setSelectedMethodId] = useState<UUID | null>(null);

  const {
    data: paymentMethods,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['finances', 'payment_method'],
    queryFn: getAllPaymentMethod,
  });

  if (error) {
    return (
      <div>Error: {(error as Error).message || 'An error has occurred'}</div>
    );
  }

  const handleSelectMethod = (paymentMethodId: UUID) => {
    setFieldValue('payment_method_id', paymentMethodId);
    setSelectedMethodId(paymentMethodId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          Selecciona un método de pago
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Elije un método de pago:</DialogTitle>
          <DialogDescription>Elegir uno :</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96">
          {paymentMethods?.map(
            (method: { name: string; payment_method_id: UUID }) => (
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
      {isLoading && <LoadingIndicator isLoading />}
    </Dialog>
  );
};
