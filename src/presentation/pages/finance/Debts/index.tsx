import React from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Icons,
  Label,
  LabelInput,
  ScrollArea,
} from '@components';
import { Formik } from 'formik';

import { Installments } from '../AccountFinancial/FormCreateAccount/Installments';
const Debts: React.FC = () => {
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
            account_type: 'inflow_of_money',
            current_quota: 1,
            type_installments: 'equal_installments',
            number_quota: 1,
            minimum_payment: 1,
            notes: '',
            total_debt: 1,
            installments: [],
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              // mutation.mutate({
              //   account: values.account,
              //   account_type: values.account_type,
              //   current_quota: values.current_quota,
              //   installments: values.installments,
              //   notes: values.notes,
              //   total_debt: values.total_debt,
              // });
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
                <Label className="font-semibold">Tipo de cuenta:</Label>

                <Installments />
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
export default Debts;
