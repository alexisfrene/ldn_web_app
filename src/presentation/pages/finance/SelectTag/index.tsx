import React, { useState } from 'react';
import { FormikValues, useFormikContext } from 'formik';
import { useQuery } from '@tanstack/react-query';
import { getExpenses } from '@services';
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
  LoadingIndicator,
  ScrollArea,
} from '@components';

export const SelectTag: React.FC = () => {
  const { setFieldValue } = useFormikContext<FormikValues>();
  const [selectedExpenseId, setSelectedExpenseId] = useState<UUID | null>(null);

  const {
    data: expenses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['expenses'],
    queryFn: getExpenses,
  });

  if (error) {
    return (
      <div>Error: {(error as Error).message || 'An error has occurred'}</div>
    );
  }

  const handleSelectExpense = (expenseId: UUID) => {
    setFieldValue('expense_id', expenseId);
    setSelectedExpenseId(expenseId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          Selecciona etiqueta de gasto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Elije una etiqueta de gasto:</DialogTitle>
          <DialogDescription>Elegir uno :</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96">
          {expenses?.length ? (
            expenses?.map(
              (expense: { description: string; expense_id: UUID }) => (
                <div
                  key={expense.expense_id}
                  className={`mb-2 cursor-pointer rounded-md p-2 ${
                    selectedExpenseId === expense.expense_id
                      ? 'bg-blue-300 dark:bg-slate-700'
                      : 'bg-gray-200 hover:bg-gray-300 dark:bg-slate-900 dark:hover:bg-slate-800'
                  }`}
                  onClick={() => handleSelectExpense(expense.expense_id)}
                >
                  {expense.description}
                </div>
              ),
            )
          ) : (
            <div>
              <Label>Esta cuenta no tiene etiqueta cargada ....</Label>
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
      {isLoading && <LoadingIndicator isLoading />}
    </Dialog>
  );
};
