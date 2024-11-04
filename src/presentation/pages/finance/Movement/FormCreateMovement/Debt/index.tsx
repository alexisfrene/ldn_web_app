import { Label } from '@components';
import React from 'react';
import { SelectFinancialAccount } from '../SelectFinancialAccount';
import { SelectPaymentMethod } from '../SelectPaymentMethod';
import { SelectDebt } from '../SelectDebt';

export const Debt: React.FC = () => {
  return (
    <div className="mt-3 grid grid-cols-2 gap-3">
      <Label>Cuenta donde saldrá el dinero :</Label> <SelectFinancialAccount />
      <Label>Método de pago :</Label> <SelectPaymentMethod />
      <Label>Que deuda :</Label>
      <SelectDebt />
    </div>
  );
};
