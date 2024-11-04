import React from 'react';
import { Formik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMovement } from '@services';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Icons,
  Label,
  LabelInput,
  RadioGroup,
  RadioGroupItem,
} from '@components';
import { SelectFinancialAccount } from './SelectFinancialAccount';
import { SelectPaymentMethod } from './SelectPaymentMethod';
import { SelectTag } from './SelectTag';
import { SelectDebt } from './SelectDebt';
import { initialValues } from './initialValues';

export const FormCreateMovement: React.FC = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createMovement,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['movements'],
      });
    },
  });

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>Crear un nuevo movimiento:</CardTitle>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, formikHelpers) => {
            mutation.mutate({
              financial_accounts_id: values.financial_accounts_id,
              label: values.label,
              payment_method_id: values.payment_method_id,
              type: values.type,
              value: values.value,
              entry_date: values.entry_date,
              expense_id: values.expense_id,
              debt_id: values.debt_id,
              installment_id: values.installment_id,
            });
            formikHelpers.resetForm();
          }}
        >
          {({ handleSubmit, isSubmitting, setFieldValue, values }) => (
            <form onSubmit={handleSubmit} className="min-h-[63vh]">
              <div className="grid grid-cols-6 gap-3">
                <div className="col-span-4">
                  <LabelInput
                    label="Descripción"
                    name="label"
                    placeholder="Venta de remeras ..."
                  />
                </div>
                <div className="col-span-2">
                  <LabelInput
                    label="Fecha"
                    name="entry_date"
                    inputType="date"
                  />
                </div>
                <RadioGroup
                  defaultValue="inflow_of_money"
                  onValueChange={(value) => setFieldValue('type', value)}
                  value={values.type}
                  className="col-span-2 h-40"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inflow_of_money" id="r1" />
                    <Label htmlFor="r1">Entrada de dinero</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="money_outflow" id="r2" />
                    <Label htmlFor="r2">Registrar un gasto</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="debt" id="r3" />
                    <Label htmlFor="r3">Pago deuda</Label>
                  </div>
                </RadioGroup>
                <div className="col-span-4 h-40 rounded-md px-3 dark:bg-slate-800/30">
                  {values.type === 'inflow_of_money' ? (
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <Label className="my-auto">Destino del dinero :</Label>
                      <SelectFinancialAccount />
                      <Label className="my-auto">Método de pago :</Label>
                      <SelectPaymentMethod />
                    </div>
                  ) : values.type === 'money_outflow' ? (
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <Label className="my-auto">
                        Cuenta donde saldrá el dinero :
                      </Label>
                      <SelectFinancialAccount />
                      <Label className="my-auto">Método de pago :</Label>
                      <SelectPaymentMethod />
                      <Label className="my-auto">Etiqueta del gasto :</Label>
                      <SelectTag />
                    </div>
                  ) : (
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <Label className="my-auto">
                        Cuenta donde saldrá el dinero :
                      </Label>
                      <SelectFinancialAccount />
                      <Label className="my-auto">Método de pago :</Label>
                      <SelectPaymentMethod />
                      <Label className="my-auto">Que deuda :</Label>
                      <SelectDebt />
                    </div>
                  )}
                </div>
              </div>
              <LabelInput
                label="Monto"
                name="value"
                inputType="number"
                disabled={values.type === 'debt'}
              />
              <Button
                className="col-span-full w-full"
                type="submit"
                disabled={
                  isSubmitting ||
                  mutation.isPending ||
                  !values.financial_accounts_id.length ||
                  !values.payment_method_id
                }
              >
                {(isSubmitting || mutation.isPending) && (
                  <div className="mx-1 w-5">
                    <Icons type="refresh" className="h-5 animate-spin" />
                  </div>
                )}
                Crear método de pago
              </Button>
            </form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};
