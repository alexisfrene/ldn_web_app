import React from "react";
import { Formik } from "formik";
import { FileWithPreview } from "@hooks/use-file-upload";
import { Button } from "@ui/button";
import { DialogClose, DialogFooter } from "@ui/dialog";
import { FileUpload } from "@ui/file-upload";
import { useEditProductImage } from "@products-hooks/use-edit-product-image";
import { useGetProductById } from "@products-hooks/use-get-product-by-id";

type Props = {
  product_id: string;
};
export const EditProductImageForm: React.FC<Props> = ({ product_id }) => {
  const { product } = useGetProductById(product_id);
  const mutation = useEditProductImage();

  return (
    <Formik
      initialValues={{ primary_image: [] as FileWithPreview[] }}
      onSubmit={async (values) => {
        if (values.primary_image && product?.product_id) {
          mutation.mutate({
            file: values.primary_image[0].file as File,
            product_id: product.product_id,
          });
        }
      }}
    >
      {({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <FileUpload
            name="primary_image"
            maxSizeMB={10}
            accept="image/*"
            maxFiles={1}
          />
          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                disabled={values.primary_image.length === 0}
              >
                Guardar
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      )}
    </Formik>
  );
};
