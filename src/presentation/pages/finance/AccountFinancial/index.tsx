import React from 'react';
import { FormCreateAccount } from './FormCreateAccount';
import { FinancialAccountGrid } from './FinancialAccountGrid';
import { Card, CardContent } from '@components';

const AccountFinancial: React.FC = () => {
  return (
    <Card className="min-h-[70vh] border-none">
      <CardContent>
        <FormCreateAccount />
        <FinancialAccountGrid />
      </CardContent>
    </Card>
  );
};
export default AccountFinancial;
