import React from "react";
import { Formik } from "formik";
import { Button } from "@ui/button";
import { DialogClose, DialogFooter } from "@ui/dialog";
import { LoadingButton } from "@ui/loading-button";
import { InputWithLabel } from "@components/common/input-with-label";
import { useCreateExpense } from "@expenses-hooks/use-create-expense";

export const CreateExpenseForm: React.FC = () => {
  const mutation = useCreateExpense();

  return (
    <Formik
      initialValues={{ name: "", description: "" }}
      onSubmit={(values, formikHelpers) => {
        mutation.mutate(values);
        formikHelpers.resetForm();
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <InputWithLabel label="Nombre" name="name" />
          <InputWithLabel label="Descripción" name="description" />
          <DialogFooter className="grid w-full grid-cols-3 gap-2">
            <DialogClose asChild className="col-start-2">
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <LoadingButton type="submit" loading={mutation.isPending}>
              Crear
            </LoadingButton>
          </DialogFooter>
        </form>
      )}
    </Formik>
  );
};
