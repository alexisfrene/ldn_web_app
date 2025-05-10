import React from "react";
import { CreateAccountModal } from "@modals";
import { FinancialAccountGrid } from "./FinancialAccountGrid";

const AccountFinancial: React.FC = () => {
  return (
    <div className="min-h-[70vh] border-none">
      <CreateAccountModal />
      <FinancialAccountGrid />
    </div>
  );
};
export default AccountFinancial;
