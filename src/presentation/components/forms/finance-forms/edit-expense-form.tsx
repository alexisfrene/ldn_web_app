import React from 'react';
import { Form, Formik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  DialogClose,
  DialogFooter,
  Icons,
  LabelInput,
  LoadingIndicator,
} from '@components';
import { editExpense } from '@services';

interface Props {
  name: string;
  description: string;
  expense_id: UUID;
}

export const EditExpenseForm: React.FC<Props> = ({
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
            label="Descripción  "
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
                {isSubmitting ? (
                  <>
                    <div className="mx-1 w-5">
                      (
                      <Icons type="refresh" className="h-5 animate-spin" />)
                    </div>
                    Editar
                  </>
                ) : (
                  <div className="mx-1 w-5">Editar</div>
                )}
              </Button>
            </DialogClose>
          </DialogFooter>
          <LoadingIndicator isLoading={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
};
