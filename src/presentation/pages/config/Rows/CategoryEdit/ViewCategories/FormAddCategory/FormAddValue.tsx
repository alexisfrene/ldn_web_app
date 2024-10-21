import React, { useState } from 'react';
import { Formik } from 'formik';
import { Label, Input, ImageUploader, Button } from '@components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addValueCategory } from '@src/services';

interface Props {
  category_id: string;
}
export const FormAddNewValue: React.FC<Props> = ({ category_id }) => {
  const [image, setImage] = useState<ImagesValues[]>([]);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addValueCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return (
    <Formik
      initialValues={{
        value: '',
        icon: null as File | null,
        icon_url: '',
      }}
      onSubmit={(values, formikHelpers) => {
        mutation.mutate({
          values: { value: values.value, icon: values.icon },
          category_id,
        });
        setImage([]);
        formikHelpers.resetForm();
      }}
    >
      {({ handleSubmit, setFieldValue, values }) => (
        <div>
          <Label>Nombre de los nuevos valores :</Label>
          <Input
            name="value"
            type="text"
            minLength={3}
            value={values.value}
            onChange={(e) => setFieldValue('value', e.target.value)}
          />
          <Label>Ingrese un icono :</Label>
          <ImageUploader
            name="icon"
            images={image}
            setImages={setImage}
            onChange={() => {
              setFieldValue('icon', image[0].file);
              setFieldValue('icon_url', image[0].url);
              setImage([]);
            }}
          />
          <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md">
            <p className="mb-2 text-lg font-semibold text-gray-700">Valor:</p>
            <p className="text-md italic text-gray-500">
              {values.value || 'Ej: Zapatillas deportivas'}
            </p>
            {values.icon && (
              <div className="mt-4">
                <img
                  src={values.icon_url}
                  alt="Icon"
                  className="h-36 w-36 rounded-full border-2 border-gray-300 shadow-sm"
                />
              </div>
            )}
          </div>
          <Button
            type="submit"
            onClick={() => handleSubmit()}
            disabled={mutation.isPending}
          >
            Crear categoría
          </Button>
        </div>
      )}
    </Formik>
  );
};
