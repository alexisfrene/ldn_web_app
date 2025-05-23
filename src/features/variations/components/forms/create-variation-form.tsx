import React from "react";
import { ErrorMessage, Formik } from "formik";
import { cn } from "@utils";
import { FileUpload } from "@ui/file-upload";
import { LoadingButton } from "@ui/loading-button";
import { InputWithLabel } from "@components/common/input-with-label";
import { ChoiceCategoryModal } from "@categories-modals/choice-category-modal";
import { useCreateVariation } from "@variations-hooks/use-create-variation";

type Props = {
  className?: string;
};

export const CreateVariationForm: React.FC<Props> = ({ className }) => {
  const mutation = useCreateVariation();

  return (
    <Formik
      initialValues={{
        category: { category_id: "", category_value_id: "" },
        title: "",
        label: "",
        images: [] as ImagesValues[],
      }}
      onSubmit={async (values) => {
        const data = {
          title: values.title,
          label: values.label,
          category_id: values.category.category_id,
          category_value: values.category.category_value_id,
          files: values.images.map((image: { file: File }) => image.file),
        };
        mutation.mutate(data);
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form
          onSubmit={handleSubmit}
          className={cn([
            "grid grid-cols-1 md:grid-cols-3 gap-3 justify-center items-center",
            className,
          ])}
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
