import { Label, RadioGroup, RadioGroupItem } from '@components';
import { useFormikContext } from 'formik';
import React from 'react';

export const SelectAccountType: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<{
    account_type: string;
  }>();

  return (
    <RadioGroup
      defaultValue="inflow_of_money"
      onValueChange={(value) => setFieldValue('account_type', value)}
      value={values.account_type}
    >
      <div className="flex items-center space-x-4">
        <RadioGroupItem value="inflow_of_money" id="inflow" />
        <Label htmlFor="inflow">Entrada</Label>
      </div>
      <div className="mt-2 flex items-center space-x-4">
        <RadioGroupItem value="money_outflow" id="outflow" />
        <Label htmlFor="outflow">Salida</Label>
      </div>
      <div className="mt-2 flex items-center space-x-4">
        <RadioGroupItem value="debt" id="debt" />
        <Label htmlFor="outflow">Deuda</Label>
      </div>
    </RadioGroup>
  );
};
