import React, { useState } from 'react';
import { FormikValues, useFormikContext } from 'formik';
import { useQuery } from '@tanstack/react-query';
import { getAllFinancialAccount } from '@services';
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
import { formattedValue } from '@utils';

export const SelectFinancialAccount: React.FC = () => {
  const { setFieldValue } = useFormikContext<FormikValues>();
  const [selectedFinancialAccountId, setSelectedFinancialAccountId] =
    useState<UUID | null>(null);

  const { data: financialAccount, error } = useQuery({
    queryKey: ['finances', 'financial_account'],
    queryFn: getAllFinancialAccount,
  });

  if (error) {
    return (
      <div>Error: {(error as Error).message || 'An error has occurred'}</div>
    );
  }

  const handleSelectFinancialAccount = ({
    financial_accounts_id,
    total,
  }: {
    financial_accounts_id: UUID;
    total: number;
  }) => {
    setFieldValue('financial_accounts_id', financial_accounts_id);
    setFieldValue('total', total);
    setFieldValue('payment_method_id', null);
    setSelectedFinancialAccountId(financial_accounts_id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          Selecciona una cuenta financiera
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Elije una cuenta:</DialogTitle>
          <DialogDescription>Cuentas cargadas </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96">
          {financialAccount?.map(
            (financialAccount: {
              name: string;
              financial_accounts_id: UUID;
              total: number;
            }) => (
              <div
                key={financialAccount.financial_accounts_id}
                className={`mb-2 cursor-pointer rounded-md p-2 ${
                  selectedFinancialAccountId ===
                  financialAccount.financial_accounts_id
                    ? 'bg-blue-300 dark:bg-slate-700'
                    : 'bg-gray-200 hover:bg-gray-300 dark:bg-slate-900 dark:hover:bg-slate-800'
                }`}
                onClick={() =>
                  handleSelectFinancialAccount({
                    financial_accounts_id:
                      financialAccount.financial_accounts_id,
                    total: financialAccount.total,
                  })
                }
              >
                <p>{financialAccount.name}</p>
                <p>{formattedValue(financialAccount.total)}</p>
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
