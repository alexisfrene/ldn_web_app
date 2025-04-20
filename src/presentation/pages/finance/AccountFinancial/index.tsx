import React from 'react';

import { FinancialAccountGrid } from './FinancialAccountGrid';
import { FormCreateAccount } from '@forms';

const AccountFinancial: React.FC = () => {
  return (
    <div className="min-h-[70vh] border-none">
      <FormCreateAccount />
      <FinancialAccountGrid />
    </div>
  );
};
export default AccountFinancial;
