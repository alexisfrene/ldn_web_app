import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import { useQuery } from '@tanstack/react-query';
import { getDebts } from '@services';
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
  ScrollArea,
} from '@components';
import { cn, formattedValue } from '@utils';

export const SelectDebt: React.FC = () => {
  const { setFieldValue } = useFormikContext();
  const [selectedInstallmentId, setSelectedInstallmentId] = useState<
    number | null
  >(null);

  const { data: debts, error } = useQuery({
    queryKey: ['debts'],
    queryFn: getDebts,
  });

  if (error) {
    return (
      <div>Error: {(error as Error).message || 'An error has occurred'}</div>
    );
  }

  const handleSelectDebt = ({
    debt_id,
    installment_id,
    amount,
  }: {
    debt_id: UUID;
    installment_id: number;
    amount: number;
  }) => {
    setFieldValue('debt_id', debt_id);
    setFieldValue('installment_id', installment_id);
    setFieldValue('value', amount);
    setSelectedInstallmentId(installment_id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          Selecciona una deuda
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Elije una deuda:</DialogTitle>
          <DialogDescription>Deudas cargadas </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96">
          {debts?.map(
            (debt: {
              name: string;
              debt_id: UUID;
              installments: {
                amount: number;
                installment_id: number;
                status: 'unpaid' | 'paid';
              }[];
            }) => (
              <div
                key={debt.debt_id}
                className={'mb-2 cursor-pointer rounded-md p-2'}
              >
                {debt.name}
                <div className="flex gap-3">
                  {debt.installments.map((installment) => (
                    <div>
                      {installment.status === 'paid' ? (
                        <p className="cursor-no-drop rounded-md bg-green-700 p-1">
                          {formattedValue(installment.amount)}
                        </p>
                      ) : (
                        <p
                          className={cn([
                            'rounded-md bg-slate-700 p-1',
                            selectedInstallmentId === installment.installment_id
                              ? 'bg-blue-300 dark:bg-slate-700'
                              : 'bg-gray-200 hover:bg-gray-300 dark:bg-slate-900 dark:hover:bg-slate-800',
                          ])}
                          onClick={() =>
                            handleSelectDebt({
                              debt_id: debt.debt_id,
                              installment_id: installment.installment_id,
                              amount: installment.amount,
                            })
                          }
                        >
                          {formattedValue(installment.amount)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
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
    </Dialog>
  );
};
