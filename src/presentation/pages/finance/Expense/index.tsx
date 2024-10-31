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
  LoadingIndicator,
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
    return <LoadingIndicator isLoading />;
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
      {expenses.data.map((expense: { description: string }) => (
        <div className="m-3 bg-cyan-400">{expense.description}</div>
      ))}
    </div>
  );
};

export default Expense;
