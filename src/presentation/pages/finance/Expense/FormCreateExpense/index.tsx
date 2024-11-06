import React from 'react';
import { Formik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createExpense } from '@services';
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
} from '@components';

export const FormCreateExpense: React.FC = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['expenses'],
      });
    },
  });

  return (
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
                  gastos , por ejemplos Gastos Varios , Gastos del Auto , etc...
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
  );
};
