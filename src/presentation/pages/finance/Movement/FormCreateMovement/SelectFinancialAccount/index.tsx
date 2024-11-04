import React, { useState } from 'react';
import { useFormikContext } from 'formik';
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

export const SelectFinancialAccount: React.FC = () => {
  const { setFieldValue } = useFormikContext();
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

  const handleSelectFinancialAccount = (financialAccountId: UUID) => {
    setFieldValue('financial_accounts_id', financialAccountId);
    setFieldValue('payment_method_id', null);
    setSelectedFinancialAccountId(financialAccountId);
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
          <DialogDescription>cuentas cargadas </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96">
          {financialAccount?.map(
            (financialAccount: {
              name: string;
              financial_accounts_id: UUID;
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
                  handleSelectFinancialAccount(
                    financialAccount.financial_accounts_id,
                  )
                }
              >
                {financialAccount.name}
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
