import React from "react";
import { Formik } from "formik";
import { useCreateExpense } from "@hooks";
import { InputWithLabel } from "@common/InputWithLabel";
import { Button } from "@ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { LoadingButton } from "@ui/loading-button";

export const CreateExpenseForm: React.FC = () => {
  const mutation = useCreateExpense();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="my-3">
          Crear etiqueta de gasto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Formik
          initialValues={{ name: "", description: "" }}
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
      </DialogContent>
    </Dialog>
  );
};
