import {
  Button,
  Card,
  CardHeader,
  CardTitle,
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
import React from 'react';

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
          <Button variant="outline">Crear etiqueta de gasto</Button>
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
                    Make changes to your profile here. Click save when you're
                    done.
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
      {expenses.data.map(
        (expense: { description: string; expense_id: string }) => (
          <Card
            key={expense.expense_id}
            className="bg-gradient-to-br from-rose-500 to-pink-300 dark:from-rose-700 dark:to-pink-700"
          >
            <CardHeader>
              <CardTitle>{expense.description}</CardTitle>
            </CardHeader>
          </Card>
        ),
      )}
    </div>
  );
};

export default Expense;
