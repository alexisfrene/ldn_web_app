import React from 'react';
import { FormCreateAccount } from './FormCreateAccount';
import { FinancialAccountGrid } from './FinancialAccountGrid';

const AccountFinancial: React.FC = () => {
  return (
    <div className="min-h-[70vh] border-none">
      <FormCreateAccount />
      <FinancialAccountGrid />
    </div>
  );
};
export default AccountFinancial;
