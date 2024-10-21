import React from 'react';
import { Formik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Icons, LabelInput, Label, ScrollArea } from '@components';
import { createFinancialAccount } from '@services';
import { Installments } from './Installments';
import { SelectAccountType } from './SelectAccountType';

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

  return (
    <Formik
      initialValues={{
        account: '',
        account_type: 'inflow_of_money',
        current_quota: 0,
        type_installments: 'equal_installments',
        number_quota: 1,
        minimum_payment: 1,
        notes: '',
        total_debt: 1,
        installments: [],
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          mutation.mutate({
            account: values.account,
            account_type: values.account_type,
            current_quota: values.current_quota,
            installments: values.installments,
            notes: values.notes,
            total_debt: values.total_debt,
          });
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
            <SelectAccountType />
            <Installments />
          </ScrollArea>
          <div className="col-span-full mt-6 flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full max-w-sm rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <Icons type="refresh" className="h-5 w-5 animate-spin" />
                  <span>Creando cuenta...</span>
                </div>
              ) : (
                'Crear cuenta'
              )}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
