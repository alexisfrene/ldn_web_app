import React from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  LabelInput,
  Skeleton,
} from '@components';
import { createExpense, getExpenses } from '@services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Formik } from 'formik';

import { CardExpense } from './CardExpense';

const Expense: React.FC = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['expenses'],
      });
    },
  });
  const expenses = useQuery({
    queryKey: ['expenses'],
    queryFn: getExpenses,
  });

  if (expenses.isPending) {
    return <Skeleton className="h-[65vh] w-[85vw]" />;
  }
  if (expenses.error) return 'An error has occurred: ';
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="my-3">
            Crear etiqueta de gasto
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Formik
            initialValues={{ name: '', description: '' }}
            onSubmit={(values, formikHelpers) => {
              mutation.mutate(values);
              formikHelpers.resetForm();
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Crear etiqueta de gasto</DialogTitle>
                  <DialogDescription>
                    Este formulario es la creación de una nueva categoría de
                    gastos , por ejemplos Gastos Varios , Gastos del Auto ,
                    etc...
                  </DialogDescription>
                </DialogHeader>
                <LabelInput label="Nombre" name="name" />
                <LabelInput label="Descripción" name="description" />
                <DialogFooter>
                  <Button type="submit">Crear</Button>
                </DialogFooter>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-2 gap-3">
        {expenses.data.map(
          (expense: {
            description: string;
            expense_id: string;
            name: string;
            money_outflow: number;
            count_movements: number;
            money_outflow_month: number;
            count_movements_month: number;
          }) => (
            <CardExpense
              count_movements={expense.count_movements}
              count_movements_month={expense.count_movements_month}
              description={expense.description}
              expense_id={expense.expense_id}
              money_outflow={expense.money_outflow}
              money_outflow_month={expense.money_outflow_month}
              name={expense.name}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default Expense;
