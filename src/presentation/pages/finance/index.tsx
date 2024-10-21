import React from 'react';
import { MenuTabs, TabsContent } from '@components';
import { RelevantInfo } from './RelevantInfo';
import { Movement } from './Movement';
import { AccountFinancial } from './AccountFinancial';
import { PaymentMethod } from './PaymentMethod';

const FinanceTabs = [
  'Información general',
  'Movimientos',
  'Cuentas Financieras',
  'Métodos de pago',
];

const Finance: React.FC = () => {
  return (
    <MenuTabs tabs={FinanceTabs} tabStyle="sm:text-xs">
      <TabsContent value={FinanceTabs[0]}>
        <RelevantInfo />
      </TabsContent>
      <TabsContent value={FinanceTabs[1]}>
        <Movement />
      </TabsContent>
      <TabsContent value={FinanceTabs[2]}>
        <AccountFinancial />
      </TabsContent>
      <TabsContent value={FinanceTabs[3]}>
        <PaymentMethod />
      </TabsContent>
    </MenuTabs>
  );
};

export default Finance;
