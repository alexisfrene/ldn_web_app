import { Button, DialogClose, Icons, LabelInput } from '@components';
import { createPaymentMethod } from '@services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik } from 'formik';
import React from 'react';
import { paymentMethodSchema } from './validations';

export const FormCreatePaymentMethod: React.FC = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createPaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['payment_method'],
      });
    },
  });

  return (
    <Formik
      initialValues={{ name: '' }}
      validationSchema={paymentMethodSchema}
      onSubmit={async (values, formikHelpers) => {
        mutation.mutate(values);
        formikHelpers.resetForm();
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <LabelInput label="Nombre del método de pago" name="name" />
          <div className="col-span-full mt-6 flex justify-center">
            <DialogClose asChild>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full max-w-sm rounded-lg bg-green-600 px-6 py-3 shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Icons type="refresh" className="h-5 w-5 animate-spin" />
                    <span>Creando método...</span>
                  </div>
                ) : (
                  'Crear método de pago'
                )}
              </Button>
            </DialogClose>
          </div>
        </form>
      )}
    </Formik>
  );
};
