import { Label } from '@components';
import React from 'react';
import { SelectFinancialAccount } from '../SelectFinancialAccount';
import { SelectPaymentMethod } from '../SelectPaymentMethod';
import { SelectTag } from '../SelectTag';

export const MoneyOutflow: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-between gap-3">
      <Label>
        Cuenta donde saldrá el dinero :
        <SelectFinancialAccount />
      </Label>
      <Label>
        Método de pago :
        <SelectPaymentMethod />
      </Label>
      <Label>
        Etiqueta del gasto :
        <SelectTag />
      </Label>
    </div>
  );
};
