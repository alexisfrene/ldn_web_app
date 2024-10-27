import { Label } from '@components';
import React from 'react';
import { SelectFinancialAccount } from '../SelectFinancialAccount';
import { SelectPaymentMethod } from '../SelectPaymentMethod';

export const InflowOfMoney: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-between gap-3">
      <Label>
        Destino del dinero :
        <SelectFinancialAccount />
      </Label>
      <Label>
        Destino del dinero :
        <SelectPaymentMethod />
      </Label>
    </div>
  );
};
