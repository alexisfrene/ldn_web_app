import React from 'react';
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
  Icons,
  LabelInput,
  LoadingIndicator,
} from '@components';
import { Form, Formik } from 'formik';
import { editExpense } from '@services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  name: string;
  description: string;
  expense_id: UUID;
}

export const FormEditExpense: React.FC<Props> = ({
  name,
  description,
  expense_id,
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: editExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['expenses'],
      });
    },
  });
  return (
    <Dialog>
      <DialogTrigger>
        <Icons
          type="copy_manual"
          height={25}
          className="cursor-pointer hover:scale-105"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar los valores de : {name}</DialogTitle>
          <DialogDescription>
            Esta acción es permanente , y puede modificar todos los movimientos
            que usan este tipo de gasto
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={{ name, description }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            mutation.mutate({
              name: values.name,
              description: values.description,
              expense_id: expense_id,
            });
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <LabelInput label="Nombre  " placeholder={name} name="name" />
              <LabelInput
                label="Nombre  "
                placeholder={description}
                name="description"
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    className="mt-6 w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <div className="mx-1 w-5">
                      {isSubmitting && (
                        <Icons type="refresh" className="h-5 animate-spin" />
                      )}
                    </div>
                    Editar
                  </Button>
                </DialogClose>
              </DialogFooter>
              <LoadingIndicator isLoading={isSubmitting} />
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
