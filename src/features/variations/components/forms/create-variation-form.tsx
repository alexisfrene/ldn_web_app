import React from "react";
import { ErrorMessage, Formik } from "formik";
import { FileUpload } from "@ui/file-upload";
import { LoadingButton } from "@ui/loading-button";
import { InputWithLabel } from "@common/input-with-label";
import { ChoiceCategoryModal } from "@categories-modals/choice-category-modal";
import { handleSubmit } from "./handleSubmit";

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
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 justify-center items-center"
        >
          <InputWithLabel label="Titulo" name="title" type="text" />
          <InputWithLabel
            label="Nombre de la colección"
            name="label"
            type="text"
          />
          <ChoiceCategoryModal />
          <div className="col-span-full">
            <FileUpload
              maxSizeMB={10}
              accept="image/*"
              maxFiles={10}
              name="images"
            />
          </div>
          <ErrorMessage name="category" />
          <LoadingButton loading={isSubmitting} type="submit">
            Crear Variación
          </LoadingButton>
        </form>
      )}
    </Formik>
  );
};
