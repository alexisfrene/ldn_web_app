import React, { useState } from 'react';
import { Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { Label, Input, Button, Icons, Separator } from '@components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addSizeCollection } from '@src/services';

type ValueProps = {
  id?: string;
  value: string;
};
export const FormAddNew: React.FC = () => {
  const [value, setValue] = useState('');
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addSizeCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sizes'] });
    },
  });

  return (
    <Formik
      initialValues={{
        title: '',
        values: [] as ValueProps[],
      }}
      onSubmit={async (values, formikHelpers) => {
        mutation.mutate(values);
        setTimeout(() => {
          formikHelpers.resetForm();
        }, 500);
      }}
    >
      {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
        <div>
          <Label>Nombre de la colección :</Label>
          <Input
            name="title"
            type="text"
            value={values['title']}
            onChange={(e) => setFieldValue('title', e.target.value)}
          />
          <Label>Valores :</Label>
          <Input
            name="values"
            type="text"
            minLength={3}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setFieldValue('values', [
                ...values.values,
                { value, id: uuidv4() },
              ]);
              setValue('');
            }}
          >
            Agregar
          </Button>
          <div className="my-3 grid grid-cols-2 gap-3">
            {values.values.map((value: { value: string; id?: string }) => {
              return (
                <div key={value.id} className="relative bg-slate-200">
                  <Icons
                    type="close"
                    className="absolute right-0 h-4 cursor-pointer bg-red-500"
                    onClick={() => {
                      const res = values.values.filter(
                        (e) => e.id !== value.id,
                      );
                      setFieldValue('values', res);
                    }}
                  />
                  <div className="m-1 flex justify-center">
                    <Label>{value.value}</Label>
                  </div>
                  <Separator />
                </div>
              );
            })}
          </div>

          <Button
            type="submit"
            onClick={() => handleSubmit()}
            disabled={isSubmitting}
          >
            Crear numero / talla
          </Button>
        </div>
      )}
    </Formik>
  );
};
