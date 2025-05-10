import React from "react";
import { ErrorMessage, Formik } from "formik";
import { ChoiceCategoryModal } from "@modals";
import { handleSubmit } from "./handleSubmit";
import { FileUpload } from "@ui/file-upload";
import { InputWithLabel } from "@common/InputWithLabel";
import { LoadingButton } from "@ui/loading-button";

export const CreateVariationForm: React.FC = () => {
  return (
    <Formik
      initialValues={{
        category: { category_id: "", category_value_id: "" },
        title: "",
        label: "",
        images: [] as ImagesValues[],
      }}
      onSubmit={async (values, formikHelpers) => {
        await handleSubmit(values, formikHelpers);
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className="flex flex-col px-10 pt-3">
          <InputWithLabel label="Titulo" name="title" type="text" />
          <InputWithLabel
            label="Nombre de la colección"
            name="label"
            type="text"
          />

          <FileUpload
            maxSizeMB={10}
            accept="image/*"
            maxFiles={10}
            name="images"
          />
          <ChoiceCategoryModal />
          <ErrorMessage name="category" />
          <LoadingButton loading={isSubmitting} type="submit">
            Crear Variación
          </LoadingButton>
        </form>
      )}
    </Formik>
  );
};
