import { Label } from '@components';
import React from 'react';
import { SelectFinancialAccount } from '../SelectFinancialAccount';
import { SelectPaymentMethod } from '../SelectPaymentMethod';
import { SelectTag } from '../SelectTag';

export const MoneyOutflow: React.FC = () => {
  return (
    <div className="mt-3 grid grid-cols-2 gap-3">
      <Label>Cuenta donde saldrá el dinero :</Label> <SelectFinancialAccount />
      <Label>Método de pago :</Label> <SelectPaymentMethod />
      <Label>Etiqueta del gasto :</Label>
      <SelectTag />
    </div>
  );
};
