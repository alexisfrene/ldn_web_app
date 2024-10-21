import React from 'react';
import { Formik } from 'formik';
import { Label, Input, Button } from '@components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addValueSize } from '@src/services';

interface FormAddNewValueProps {
  size_id: string;
}
export const FormAddNewValue: React.FC<FormAddNewValueProps> = ({
  size_id,
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addValueSize,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sizes'] });
    },
  });
  return (
    <Formik
      initialValues={{
        value: '',
      }}
      onSubmit={async (values, formikHelpers) => {
        mutation.mutate({ value: values.value, size_id });
        setTimeout(() => {
          formikHelpers.resetForm();
        }, 500);
      }}
    >
      {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
        <div>
          <Label>Nombre del nuevo valor :</Label>
          <Input
            name="value"
            type="text"
            minLength={3}
            value={values['value']}
            onChange={(e) => setFieldValue('value', e.target.value)}
          />
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
