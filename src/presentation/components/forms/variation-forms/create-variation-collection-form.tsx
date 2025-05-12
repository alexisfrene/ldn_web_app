import React, { useState } from "react";
import { Formik } from "formik";
import { useCreateVariationCollection } from "@hooks/variation-hooks";
import { Icons } from "@common/Icons";
import { ImageLoader } from "@common/ImageLoader";
import { ImageUploader } from "@common/ImageUploader";
import { InputWithLabel } from "@common/InputWithLabel";
import { Button } from "@ui/button";
import { Separator } from "@ui/separator";

type Props = {
  variationId: string;
};

export const CreateVariationCollectionForm: React.FC<Props> = ({
  variationId,
}) => {
  const [images, setImages] = useState<ImagesValues[]>([]);
  const mutation = useCreateVariationCollection();

  return (
    <Formik
      initialValues={{ label: "", images: [] as ImagesValues[] }}
      onSubmit={(values, formikHelpers) => {
        mutation.mutate({
          label: values.label,
          images: values.images.map((image) => image.file),
          variation_id: variationId,
        });
        setImages([]);
        formikHelpers.resetForm();
      }}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <InputWithLabel label="Nombre" name="label" />
          <ImageUploader name="images" images={images} setImages={setImages} />
          <div className="my-3 grid grid-cols-4 gap-3">
            {values.images.map((value: ImagesValues) => {
              return (
                <div
                  key={value.id}
                  className="relative bg-slate-200 dark:bg-slate-600/50"
                >
                  <Icons
                    type="close"
                    className="absolute right-0 h-4 cursor-pointer bg-red-500"
                    onClick={() => {
                      const res = values.images.filter(
                        (e: { id: string }) => e?.id !== value.id,
                      );
                      setFieldValue("images", res);
                      setImages(res);
                    }}
                  />

                  <div className="m-1 flex justify-center">
                    <ImageLoader alt="Imagen" url={value.url} />
                  </div>
                  <Separator />
                </div>
              );
            })}
          </div>
          <Button
            type="submit"
            disabled={mutation.isPending}
            onClick={() => handleSubmit()}
          >
            <div
              className={`${mutation.isPending ? "relative" : "hidden"} mx-1 w-5`}
            >
              {mutation.isPending && (
                <Icons type="refresh" className="h-5 animate-spin" />
              )}
            </div>
            Crear producto
          </Button>
        </form>
      )}
    </Formik>
  );
};
