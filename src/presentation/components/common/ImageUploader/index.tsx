import React, { useRef } from "react";
import { ErrorMessage, FormikValues, useFormikContext } from "formik";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Button, Input } from "@components";

interface Props {
  name: string;
  setImages: (values: ImagesValues[]) => void;
  images: ImagesValues[];
  onChange?: () => void;
}

export const ImageUploader: React.FC<Props> = ({
  name,
  setImages,
  images,
  onChange,
}) => {
  const { errors, setFieldValue } = useFormikContext<FormikValues>();
  const inputRef = useRef<HTMLInputElement>(null);

  const removeImage = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex">
      <Input
        ref={inputRef}
        accept="image/*"
        name={name}
        type="file"
        className={`cursor-pointer hover:text-slate-600 ${
          errors[name] && "border-red-600 text-red-600"
        }`}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            if (file.size > 15 * 1024 * 1024) {
              toast("El archivo no debe superar los 15 MB");
              return;
            }
            const url = URL.createObjectURL(file);
            setImages([...images, { url, file, id: uuidv4() }]);
          }
        }}
      />
      <p className="my-1 text-xs text-red-600">
        <ErrorMessage name={name} />
      </p>
      <Button
        type="button"
        variant="secondary"
        onClick={() => {
          if (onChange) {
            onChange();
          } else {
            setFieldValue(name, images);
          }
          removeImage();
        }}
      >
        Agregar
      </Button>
    </div>
  );
};
