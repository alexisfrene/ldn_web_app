import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import { updatePrimaryImage } from "@services";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Icons,
  ImageLoader,
  ImageUploader,
  LoadingIndicator,
  TokenImage,
} from "@components";

interface Props {
  product: Product;
}

export const PrimaryImage: React.FC<Props> = ({ product }) => {
  const [image, setImage] = useState<ImagesValues[]>([]);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updatePrimaryImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product_details", product.product_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  return (
    <div className="relative flex justify-center rounded-sm bg-slate-200 py-2 dark:bg-slate-900">
      <AlertDialog>
        <AlertDialogTrigger className="relative">
          <Icons
            type="copy_manual"
            className="absolute top-0 left-0 m-2 h-7 cursor-pointer rounded-sm bg-white p-1 hover:text-slate-700 sm:h-10 dark:bg-slate-700 dark:hover:bg-slate-900 dark:hover:text-slate-50"
          />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cambiar la imagen principal</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción es permanente y la imagen antigua se perderá.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Formik
            initialValues={{ primary_image: [] as ImagesValues[] }}
            onSubmit={async (values) => {
              if (values.primary_image && product.product_id) {
                mutation.mutate({
                  file: values.primary_image[0].file,
                  product_id: product.product_id,
                });
              }
            }}
          >
            {({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <ImageUploader
                  name="primary_image"
                  images={image}
                  setImages={setImage}
                />
                {values.primary_image[0]?.url && (
                  <ImageLoader
                    url={image[0]?.url}
                    className="h-36 w-36"
                    alt={product.name}
                  />
                )}
                <AlertDialogFooter>
                  <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                  <AlertDialogAction type="submit">Continue</AlertDialogAction>
                </AlertDialogFooter>
              </form>
            )}
          </Formik>
        </AlertDialogContent>
      </AlertDialog>
      <div className="sm:h-60 sm:w-60">
        <TokenImage
          url={`${product.primary_image?.toString()}?width=450&height=450&quality=70&format=webp`}
          variant="default"
          className="w-full rounded-md object-cover"
        />
      </div>
      <LoadingIndicator isLoading={mutation.isPending} />
    </div>
  );
};
