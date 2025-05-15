import React from "react";
import { Formik } from "formik";
import { FileWithPreview } from "@hooks/use-file-upload";
import { FileUpload } from "@ui/file-upload";
import { LoadingButton } from "@ui/loading-button";
import { InputWithLabel } from "@common/InputWithLabel";
import { useCreateVariationCollection } from "@features/variations/hooks";

type Props = {
  variationId: string;
};

export const CreateVariationCollectionForm: React.FC<Props> = ({
  variationId,
}) => {
  const mutation = useCreateVariationCollection();

  return (
    <Formik
      initialValues={{ label: "", files: [] as FileWithPreview[] }}
      onSubmit={(values, formikHelpers) => {
        mutation.mutate({
          label: values.label,
          images: values.files
            .map((image: FileWithPreview) =>
              image.file instanceof File ? image.file : null,
            )
            .filter((file): file is File => file !== null),
          variation_id: variationId,
        });
        formikHelpers.resetForm();
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
          <InputWithLabel label="Nombre" name="label" />
          <FileUpload accept="image/*" maxFiles={10} maxSizeMB={10} />
          <LoadingButton type="submit" loading={mutation.isPending}>
            Crear colección
          </LoadingButton>
        </form>
      )}
    </Formik>
  );
};
