import { TabsComponent } from '@components';
import React from 'react';

const FinanceTabs = [
  {
    path: '/app/finance/info',
    label: 'Información general',
  },
  {
    path: '/app/finance/movement',
    label: 'Movimientos',
  },
  {
    path: '/app/finance/financial-account',
    label: 'Cuentas Financieras',
  },
  {
    path: '/app/finance/payment-method',
    label: 'Métodos de pago',
  },
];

const Finance: React.FC = () => {
  return <TabsComponent tabs={FinanceTabs} />;
};

export default Finance;
