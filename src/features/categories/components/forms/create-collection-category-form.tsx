import React, { useState } from "react";
import { Formik } from "formik";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Separator } from "@ui/separator";
import { Icons } from "@components/common/icons";
import { ImageUploader } from "@components/common/image-uploader";
import { LoadingIndicator } from "@components/common/loading";
import { useCreateCategoryCollection } from "@categories-hooks/use-create-category-collection";

type IconProps = {
  url: string;
  file: File;
};

type ValueProps = {
  id: string;
  icon: IconProps;
  value: string;
};
export const CreateCollectionCategoryForm: React.FC = () => {
  const [value, setValue] = useState("");
  const [imageCount, setImageCount] = useState(0);
  const [image, setImage] = useState<ImagesValues[]>([]);
  const mutation = useCreateCategoryCollection();

  return (
    <Formik
      initialValues={{
        title: "",
        values: [] as ValueProps[],
      }}
      onSubmit={(values, formikHelpers) => {
        mutation.mutate({
          title: values.title,
          values: values.values,
        });
        setTimeout(() => {
          setValue("");
          setImageCount(0);
          setImage([]);
          formikHelpers.resetForm();
        }, 600);
      }}
    >
      {({ handleSubmit, setFieldValue, values }) => (
        <div>
          <Label>Nombre de la colección :</Label>
          <Input
            name="title"
            type="text"
            value={values.title}
            onChange={(e) => setFieldValue("title", e.target.value)}
          />
          <Label>Valores :</Label>
          <Input
            name="values"
            type="text"
            minLength={3}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Label>Ingrese un icono :</Label>
          <ImageUploader
            name="values"
            images={image}
            setImages={setImage}
            onChange={() => {
              setFieldValue("values", [
                ...values.values,
                {
                  id: crypto.randomUUID(),
                  value,
                  icon: {
                    url: image[imageCount].url,
                    file: image[imageCount].file,
                  },
                },
              ]);
              setImageCount(imageCount + 1);
              setValue("");
            }}
          />
          <div className="my-3 grid grid-cols-2 gap-3">
            {values.values.map(
              (value: { value: string; icon: { url: string }; id: string }) => {
                return (
                  <div key={value.id} className="relative bg-slate-200">
                    <Icons
                      type="close"
                      className="absolute right-0 h-4 cursor-pointer bg-red-500"
                      onClick={() => {
                        const res = values.values.filter(
                          (e) => e.id !== value.id,
                        );
                        setFieldValue("values", res);
                      }}
                    />
                    <div className="m-1 flex justify-center">
                      <img src={value.icon.url} className="h-[64px] w-[64px]" />
                    </div>
                    <div className="m-1 flex justify-center">
                      <Label>{value.value}</Label>
                    </div>
                    <Separator />
                  </div>
                );
              },
            )}
          </div>
          <Button
            className="w-full"
            type="submit"
            onClick={() => handleSubmit()}
            disabled={mutation.isPending}
          >
            Crear categoría
          </Button>
          <LoadingIndicator isLoading={mutation.isPending} />
        </div>
      )}
    </Formik>
  );
};
