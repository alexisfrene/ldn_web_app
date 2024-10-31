import React from 'react';
import { Field, Formik } from 'formik';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Icons,
  LabelInput,
  Label,
  ScrollArea,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  LoadingIndicator,
  Card,
  CardContent,
} from '@components';
import { createFinancialAccount, getAllPaymentMethodForUser } from '@services';
import { FormCreatePaymentMethod } from './FormCreatePaymentMethod';

export const FormCreateAccount: React.FC = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createFinancialAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['financial_accounts'],
      });
    },
  });
  const paymentMethod = useQuery({
    queryKey: ['payment_method'],
    queryFn: () => getAllPaymentMethodForUser(),
  });

  if (paymentMethod.isPending) {
    return <LoadingIndicator isLoading />;
  }
  if (paymentMethod.error) return 'An error has occurred: ';

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="icon"
          className="bg-green-100 hover:bg-green-300 dark:bg-slate-600 dark:hover:bg-slate-500"
        >
          <Icons type="plus_circle" className="dark:text-slate-300" />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[80vh] max-w-5xl">
        <DialogHeader>
          <DialogTitle>Crear nueva cuenta financiera :</DialogTitle>
          <DialogDescription>
            Aquí puede crear una nueva cuenta financiera.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={{
            account: '',
            payment_method: [] as string[],
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              mutation.mutate({
                account: values.account,
                payment_method: values.payment_method,
              });
              //alert(JSON.stringify(values, null, 2));
            } finally {
              setSubmitting(false);
              resetForm();
            }
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <ScrollArea className="h-[60vh]">
                <LabelInput label="Nombre de la cuenta" name="account" />
                <Label className="font-semibold">
                  Que métodos de pagos afectan a esta cuenta :
                </Label>
                <Card className="min-h-[70vh] border-none">
                  <CardContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          size="icon"
                          className="bg-green-100 hover:bg-green-300"
                        >
                          <Icons type="plus_circle" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="h-96">
                        <DialogHeader>
                          <DialogTitle>
                            Crear nuevo método de pago :
                          </DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                          Aquí puede crear método de pago
                        </DialogDescription>
                        <FormCreatePaymentMethod />
                      </DialogContent>
                    </Dialog>
                    <div className="flex flex-wrap gap-1">
                      {paymentMethod.data &&
                        paymentMethod.data.map(
                          (
                            account: {
                              name: string;
                              payment_method_id: string;
                            },
                            index: number,
                          ) => (
                            <div
                              key={index}
                              className="w-32 rounded-sm bg-slate-700 py-3 text-center align-middle"
                            >
                              <Field
                                type="checkbox"
                                name="payment_method"
                                value={account.payment_method_id}
                              />
                              {account.name}
                            </div>
                          ),
                        )}
                    </div>
                  </CardContent>
                </Card>
              </ScrollArea>
              <div className="col-span-full mt-6 flex justify-center">
                <DialogClose asChild>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full max-w-sm rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:text-black"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <Icons
                          type="refresh"
                          className="h-5 w-5 animate-spin"
                        />
                        <span>Creando cuenta...</span>
                      </div>
                    ) : (
                      'Crear cuenta'
                    )}
                  </Button>
                </DialogClose>
              </div>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
