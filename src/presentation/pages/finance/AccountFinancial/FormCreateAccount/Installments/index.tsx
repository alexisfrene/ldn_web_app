import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DropdownInput,
  Label,
  LabelInput,
  RadioGroup,
  RadioGroupItem,
} from '@components';
import { useFormikContext } from 'formik';

export const Installments: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<{
    account_type: string;
    type_installments: string;
    number_quota: number;
    total_debt: number;
    installments: {
      amount: number | string;
      due_date: string;
      status: string;
    }[];
  }>();
  const [remainingAmount, setRemainingAmount] = useState(values.total_debt);
  const [hasExceeded, setHasExceeded] = useState(false);

  useEffect(() => {
    if (values.number_quota !== values.installments.length) {
      const newInstallments = [...values.installments];

      if (values.number_quota > values.installments.length) {
        for (let i = values.installments.length; i < values.number_quota; i++) {
          newInstallments.push({ amount: 0, due_date: '', status: 'unpaid' });
        }
        setFieldValue('installments', newInstallments);
      }

      if (values.number_quota < values.installments.length) {
        setFieldValue(
          'installments',
          newInstallments.slice(0, values.number_quota),
        );
      }
    }
  }, [values.number_quota, values.installments, setFieldValue]);

  useEffect(() => {
    const totalInstallmentsAmount = values.installments.reduce(
      (sum, installment) => sum + Number(installment.amount),
      0,
    );
    const remaining = values.total_debt - totalInstallmentsAmount;

    setRemainingAmount(remaining);
    setHasExceeded(remaining < 0);
  }, [values.installments, values.total_debt]);

  const renderInstallments = (installmentsCount: number) => {
    return Array.from({ length: installmentsCount }, (_, index) => (
      <Card key={index}>
        <CardHeader>
          <CardTitle>Cuota número {index + 1}</CardTitle>
        </CardHeader>
        <CardContent>
          <LabelInput
            label="Monto"
            name={`installments[${index}].amount`}
            inputType="number"
          />
          <RadioGroup
            defaultValue="unpaid"
            onValueChange={(value) =>
              setFieldValue(`installments[${index}].status`, value)
            }
            value={values.installments[`${index}`].status}
          >
            <p className="font-semibold">Estado :</p>
            <div className="flex items-center space-x-4">
              <RadioGroupItem value="unpaid" id="inflow" />
              <Label htmlFor="unpaid">No pagado aun</Label>
            </div>
            <div className="mt-2 flex items-center space-x-4">
              <RadioGroupItem value="paid" id="paid" />
              <Label htmlFor="paid">Ya pagado</Label>
            </div>
          </RadioGroup>
          <LabelInput
            label="Fecha de pago"
            name={`installments[${index}].due_date`}
            inputType="date"
          />
        </CardContent>
      </Card>
    ));
  };

  return (
    <div>
      {values.account_type === 'debt' && (
        <div>
          <LabelInput label="Agrega un nota de la deuda" name="notes" />
          <LabelInput label="Pago mínimo" name="minimum_payment" />
          <LabelInput
            label="Que cuota vas ?"
            name="current_quota"
            inputType="number"
          />
          <LabelInput
            label="Total de cuotas"
            name="number_quota"
            inputType="number"
          />
          <LabelInput
            label="Cuanto es el total a pagar ?"
            name="total_debt"
            inputType="number"
          />
          <DropdownInput
            title="Elegir una frecuencia de pago"
            options={[
              { type: 'monthly', title: 'Mensual' },
              { type: 'bi-weekly', title: 'Quincenal' },
              { type: 'weekly', title: 'Semanal' },
            ]}
            name="payment_frequency"
          />
          <RadioGroup
            defaultValue="equal_installments"
            onValueChange={(value) => setFieldValue('type_installments', value)}
            value={values.type_installments}
          >
            <Label className="my-3 font-semibold">
              Las cuotas son del tipo ?
            </Label>
            <div className="flex items-center space-x-4">
              <RadioGroupItem
                value="equal_installments"
                id="equal_installments"
              />
              <Label htmlFor="equal_installments">
                Cuotas de igual monto y fecha
              </Label>
            </div>
            <div className="mt-2 flex items-center space-x-4">
              <RadioGroupItem
                value="unequal_installments"
                id="unequal_installments"
              />
              <Label htmlFor="unequal_installments">
                Cuotas de diferentes monto o fecha
              </Label>
            </div>
          </RadioGroup>
          <div></div>
          {values.type_installments === 'unequal_installments' ? (
            <div>
              {hasExceeded ? (
                <span className="text-red-600">
                  ¡Te has pasado por {Math.abs(remainingAmount).toFixed(2)}!
                </span>
              ) : (
                <span className="text-green-600">
                  Te faltan {remainingAmount.toFixed(2)} para completar el
                  total.
                </span>
              )}
              <div className="flex flex-wrap gap-3 p-3">
                {renderInstallments(values.number_quota).map(
                  (installment, index) => (
                    <div key={index} className="flex-grow">
                      {installment}
                    </div>
                  ),
                )}
              </div>
            </div>
          ) : (
            <LabelInput
              label="Fecha de pago"
              name={'installments[0].due_date'}
              inputType="date"
              onChange={(e) => {
                const newInstallments = [...values.installments];
                newInstallments[0].due_date = e.target.value;
                setFieldValue('installments', newInstallments);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
