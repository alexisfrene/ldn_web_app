import React from 'react';
import { Formik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDate } from '@utils';
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
import { InflowOfMoney } from './InflowOfMoney';
import { MoneyOutflow } from './MoneyOutflow';
import { Debt } from './Debt';

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
          initialValues={{
            label: '',
            value: 0,
            type: 'inflow_of_money',
            payment_method_id: '' as UUID,
            financial_accounts_id: '' as UUID,
            entry_date: formatDate(new Date()),
            expense_id: '' as UUID,
          }}
          onSubmit={async (values, formikHelpers) => {
            mutation.mutate({
              financial_accounts_id: values.financial_accounts_id,
              label: values.label,
              payment_method_id: values.payment_method_id,
              type: values.type,
              value: values.value,
              entry_date: values.entry_date,
              expense_id: values.expense_id,
            });
            formikHelpers.resetForm();
          }}
        >
          {({ handleSubmit, isSubmitting, setFieldValue, values }) => (
            <form onSubmit={handleSubmit} className="min-h-[63vh]">
              <LabelInput label="Descripción" name="label" />
              <LabelInput label="Monto" name="value" inputType="number" />
              <LabelInput label="Fecha" name="entry_date" inputType="date" />
              <RadioGroup
                defaultValue="inflow_of_money"
                onValueChange={(value) => setFieldValue('type', value)}
                value={values.type}
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
              <div>
                {values.type === 'inflow_of_money' ? (
                  <InflowOfMoney />
                ) : values.type === 'money_outflow' ? (
                  <MoneyOutflow />
                ) : (
                  <Debt />
                )}
              </div>
              <Button
                className="col-span-full"
                type="submit"
                disabled={
                  isSubmitting ||
                  mutation.isPending ||
                  !values.financial_accounts_id.length ||
                  !values.payment_method_id.length
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
