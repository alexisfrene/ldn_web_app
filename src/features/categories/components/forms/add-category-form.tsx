import React from "react";
import { Formik } from "formik";
import { FileWithPreview } from "@hooks/use-file-upload";
import { Button } from "@ui/button";
import { FileUpload } from "@ui/file-upload";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { useAddCategoryValue } from "@categories-hooks/use-add-category-value";

interface Props {
  category_id: number;
}
export const AddCategoryForm: React.FC<Props> = ({ category_id }) => {
  const mutation = useAddCategoryValue();

  return (
    <Formik
      initialValues={{
        value: "",
        icon: null as FileWithPreview[] | null,
      }}
      onSubmit={(values, formikHelpers) => {
        if (!values.icon) {
          formikHelpers.setFieldError("icon", "El icono es requerido");
          return;
        } else {
          mutation.mutate({
            values: {
              value: values.value,
              icon:
                values?.icon[0]?.file instanceof File
                  ? values.icon[0].file
                  : null,
            },
            category_id,
          });
        }

        formikHelpers.resetForm();
      }}
    >
      {({ handleSubmit, setFieldValue, values }) => (
        <form onSubmit={handleSubmit}>
          <Label>Nombre de los nuevos valores :</Label>
          <Input
            name="value"
            type="text"
            minLength={3}
            value={values.value}
            onChange={(e) => setFieldValue("value", e.target.value)}
          />
          <Label>Ingrese un icono :</Label>
          <FileUpload name="icon" accept="image/*" />
          <Button type="submit" disabled={mutation.isPending}>
            Crear categoría
          </Button>
        </form>
      )}
    </Formik>
  );
};
