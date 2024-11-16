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
  Card,
  CardContent,
} from '@components';
import { createFinancialAccount, getAllPaymentMethodForUser } from '@services';
import { FormCreatePaymentMethod } from './FormCreatePaymentMethod';
import { useLoading } from '@hooks';

export const FormCreateAccount: React.FC = () => {
  const { doneLoading, startLoading } = useLoading();
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
    startLoading();
  }
  if (paymentMethod.isSuccess) {
    doneLoading();
  }
  if (paymentMethod.error) return 'An error has occurred: ';

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="my-3">
          Crear nueva cuenta
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Crear nueva cuenta financiera :</DialogTitle>
          <DialogDescription>
            Aquí puede crear una nueva cuenta financiera.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={{
            account: '',
            payment_method: [],
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              mutation.mutate({
                account: values.account,
                payment_method: values.payment_method,
              });
            } finally {
              setSubmitting(false);
              resetForm();
            }
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <ScrollArea className="h-[40vh]">
                <div className="mx-3">
                  <LabelInput label="Nombre de la cuenta" name="account" />
                  <Label className="font-semibold">
                    Que métodos de pagos afectan a esta cuenta :
                  </Label>
                </div>
                <Card className="border-none">
                  <CardContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Label className="my-3 flex items-center gap-3 align-middle text-slate-400">
                          <p>
                            O puedes crear un método nuevo presionando aquí :
                          </p>
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="rounded-full"
                          >
                            <Icons type="plus_circle" height={35} />
                          </Button>
                        </Label>
                      </DialogTrigger>
                      <DialogContent className="w-fit">
                        <FormCreatePaymentMethod />
                      </DialogContent>
                    </Dialog>
                    <div className="flex flex-wrap gap-1">
                      {paymentMethod.data &&
                        paymentMethod.data.map(
                          (
                            account: {
                              name: string;
                              payment_method_id: number;
                            },
                            index: number,
                          ) => (
                            <div
                              key={index}
                              className="w-32 rounded-md bg-amber-200 p-4 text-center shadow-md dark:bg-slate-700"
                            >
                              <label className="flex flex-col items-center space-y-2">
                                <Field
                                  type="checkbox"
                                  name="payment_method"
                                  value={account.payment_method_id.toString()}
                                  className="h-5 w-5 cursor-pointer rounded-md text-blue-600 focus:ring-2 focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-slate-800 dark:text-white">
                                  {account.name}
                                </span>
                              </label>
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
