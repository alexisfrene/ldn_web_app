import React from "react";
import { Formik } from "formik";
import { Button } from "@ui/button";
import { DialogClose } from "@ui/dialog";
import { Icons } from "@common/Icons";
import { InputWithLabel } from "@common/InputWithLabel";
import { useCreatePaymentMethod } from "@features/payment-methods/hooks/use-create-payment-method";
import { paymentMethodSchema } from "./validations";

export const FormCreatePaymentMethod: React.FC = () => {
  const mutation = useCreatePaymentMethod();

  return (
    <Formik
      initialValues={{ name: "" }}
      validationSchema={paymentMethodSchema}
      onSubmit={async (values, formikHelpers) => {
        mutation.mutate(values);
        formikHelpers.resetForm();
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <InputWithLabel label="Nombre del método de pago" name="name" />
          <div className="col-span-full mt-6 flex justify-center">
            <DialogClose asChild>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="focus:ring-opacity-50 w-full max-w-sm rounded-lg bg-green-600 px-6 py-3 shadow-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-hidden"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Icons type="refresh" className="h-5 w-5 animate-spin" />
                    <span>Creando método...</span>
                  </div>
                ) : (
                  "Crear método de pago"
                )}
              </Button>
            </DialogClose>
          </div>
        </form>
      )}
    </Formik>
  );
};
