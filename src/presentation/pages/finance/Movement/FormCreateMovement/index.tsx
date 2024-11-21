import React from 'react';
import { Formik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMovement } from '@services';
import {
  Button,
  Icons,
  Label,
  LabelInput,
  RadioGroup,
  RadioGroupItem,
} from '@components';
import { SelectFinancialAccount } from '../../SelectFinancialAccount';
import { SelectPaymentMethod } from '../../SelectPaymentMethod';
import { SelectTag } from '../../SelectTag';
import { SelectDebt } from '../../SelectDebt';
import { initialValues } from './initialValues';
import { movementSchema } from './validations';

export const FormCreateMovement: React.FC = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createMovement,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['movements'],
      });
      queryClient.invalidateQueries({
        queryKey: ['finances'],
      });
      queryClient.invalidateQueries({
        queryKey: ['financial_account'],
      });
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={movementSchema}
      onSubmit={(values, formikHelpers) => {
        if (values.type !== 'inflow_of_money') {
          if (values.total < values.value) {
            formikHelpers.setSubmitting(false);
            return formikHelpers.setFieldError(
              'value',
              `La cuenta no tiene el saldo suficiente , solo cuenta con $ ${values.total}`,
            );
          }
        }
        mutation.mutate({
          financial_accounts_id: values.financial_accounts_id,
          label: values.label || 'Sin nombre',
          payment_method_id: values.payment_method_id,
          type: values.type,
          value: values.value,
          entry_date: values.entry_date,
          expense_id: values.expense_id || undefined,
          debt_id: values.debt_id || undefined,
          installment_id: values.installment_id || undefined,
        });
        formikHelpers.resetForm();
      }}
    >
      {({ handleSubmit, isSubmitting, setFieldValue, values }) => (
        <form onSubmit={handleSubmit} className="ml-3 min-h-[63vh]">
          <div className="grid grid-cols-6 gap-3">
            <Label className="col-span-full mt-6 text-base">
              Crear un nuevo movimiento :
            </Label>
            <div className="col-span-full sm:col-span-4">
              <LabelInput
                label="Descripción"
                name="label"
                placeholder="Venta de remeras ..."
              />
            </div>
            <div className="col-span-full sm:col-span-2">
              <LabelInput label="Fecha" name="entry_date" inputType="date" />
            </div>
            <RadioGroup
              defaultValue="inflow_of_money"
              onValueChange={(value) => setFieldValue('type', value)}
              value={values.type}
              className="col-span-full h-40 sm:col-span-2"
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
            <div className="col-span-full h-40 rounded-md px-3 dark:bg-slate-800/30 sm:col-span-4">
              {values.type === 'inflow_of_money' ? (
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <Label className="my-auto hidden sm:block">
                    Destino del dinero :
                  </Label>
                  <SelectFinancialAccount />
                  <Label className="my-auto hidden sm:block">
                    Método de pago :
                  </Label>
                  <SelectPaymentMethod />
                </div>
              ) : values.type === 'money_outflow' ? (
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <Label className="my-auto hidden sm:block">
                    Cuenta donde saldrá el dinero :
                  </Label>
                  <SelectFinancialAccount />
                  <Label className="my-auto hidden sm:block">
                    Método de pago :
                  </Label>
                  <SelectPaymentMethod />
                  <Label className="my-auto hidden sm:block">
                    Etiqueta del gasto :
                  </Label>
                  <SelectTag />
                </div>
              ) : (
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <Label className="my-auto hidden sm:block">
                    Cuenta donde saldrá el dinero :
                  </Label>
                  <SelectFinancialAccount />
                  <Label className="my-auto hidden sm:block">
                    Método de pago :
                  </Label>
                  <SelectPaymentMethod />
                  <Label className="my-auto hidden sm:block">Que deuda :</Label>
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
            className="col-span-full mt-3 w-full"
            type="submit"
            disabled={
              isSubmitting ||
              mutation.isPending ||
              !values.financial_accounts_id.length ||
              !values.payment_method_id ||
              !values.label
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
  );
};
