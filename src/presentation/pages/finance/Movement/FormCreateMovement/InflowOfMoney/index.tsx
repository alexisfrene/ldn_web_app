import { Label } from '@components';
import React from 'react';
import { SelectFinancialAccount } from '../SelectFinancialAccount';
import { SelectPaymentMethod } from '../SelectPaymentMethod';

export const InflowOfMoney: React.FC = () => {
  return (
    <div className="mt-3 grid grid-cols-2 gap-3">
      <Label>Destino del dinero :</Label> <SelectFinancialAccount />
      <Label>Método de pago :</Label> <SelectPaymentMethod />
    </div>
  );
};
