import React from 'react';
import { FinancialAccountGrid } from './FinancialAccountGrid';
import { CreateAccountModal } from '@modals';

const AccountFinancial: React.FC = () => {
  return (
    <div className="min-h-[70vh] border-none">
      <CreateAccountModal />
      <FinancialAccountGrid />
    </div>
  );
};
export default AccountFinancial;
