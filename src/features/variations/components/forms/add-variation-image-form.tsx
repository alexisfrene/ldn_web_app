import React from "react";
import { Formik } from "formik";
import { FileWithPreview } from "@hooks/use-file-upload";
import { useAddVariationCollectionValue } from "@features/variations/hooks";
import { Button } from "@ui/button";
import { DialogClose, DialogFooter } from "@ui/dialog";
import { FileUpload } from "@ui/file-upload";

type Props = {
  collectionId: string;
  variation_id: string;
};
export const AddVariationImageForm: React.FC<Props> = ({
  collectionId,
  variation_id,
}) => {
  const mutation = useAddVariationCollectionValue();
  return (
    <Formik
      initialValues={{ files: [] as FileWithPreview[] }}
      onSubmit={(values) => {
        if (values.files.length === 0) return;
        mutation.mutate({
          collection_id: collectionId,
          file: values.files[0].file as File,
          variation_id: variation_id,
        });
      }}
    >
      {({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <FileUpload accept="image/*" maxFiles={1} maxSizeMB={10} />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" disabled={values.files.length === 0}>
                Cargar imagen
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      )}
    </Formik>
  );
};
