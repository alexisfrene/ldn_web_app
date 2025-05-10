import React from "react";
import { Formik } from "formik";
import { useCreateBrand } from "@hooks";
import { InputWithLabel } from "@common/InputWithLabel";
import { Button } from "@ui/button";
import { DialogClose, DialogFooter } from "@ui/dialog";
import { LoadingButton } from "@ui/loading-button";

export const CreateBrandForm: React.FC = () => {
  const mutation = useCreateBrand();

  return (
    <Formik
      initialValues={{
        title: "",
      }}
      onSubmit={async (values, formikHelpers) => {
        mutation.mutate(values);
        setTimeout(() => {
          formikHelpers.resetForm();
        }, 500);
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <div>
          <InputWithLabel label="Título" name="title" />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <LoadingButton
                type="submit"
                onClick={() => handleSubmit()}
                loading={isSubmitting}
              >
                Crear
              </LoadingButton>
            </DialogClose>
          </DialogFooter>
        </div>
      )}
    </Formik>
  );
};
