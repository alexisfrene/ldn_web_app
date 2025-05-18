import React from "react";
import { FormikValues, useFormikContext } from "formik";
import { Label } from "@ui/label";
import { CreateAccountModal } from "@accounts-modals/create-account-modal";
import { CreateExpenseModal } from "@expenses-modals/create-expense-modal";
import { SelectFinancialAccount } from "@accounts-selects/select-financial-account";
import { SelectDebt } from "@debts-selects/select-debt";
import { SelectExpense } from "@expenses-selects/select-expense";
import { SelectPaymentMethod } from "@payment-methods-selects/select-payment-method";

export const SelectMovementAccount: React.FC = () => {
  const { values } = useFormikContext<FormikValues>();

  return (
    <div>
      {values.type === "inflow_of_money" ? (
        <div className="w-full items-center gap-1.5">
          <Label>
            Destino donde ingresara el dinero o <CreateAccountModal />
          </Label>
          <SelectFinancialAccount />
          {values.financial_accounts_id && (
            <>
              <Label>Método de pago :</Label>
              <SelectPaymentMethod />
            </>
          )}
        </div>
      ) : values.type === "money_outflow" ? (
        <div className="w-full items-center gap-1.5">
          <Label>
            Cuenta donde saldrá el dinero o <CreateAccountModal />
          </Label>
          <SelectFinancialAccount />
          {values.financial_accounts_id && (
            <>
              <Label>Método de pago :</Label>
              <SelectPaymentMethod />
            </>
          )}
          <Label>
            Etiqueta del gasto o <CreateExpenseModal />
          </Label>
          <SelectExpense />
        </div>
      ) : (
        <div className="w-full items-center gap-1.5">
          <Label>
            Cuenta donde saldrá el dinero o <CreateAccountModal />
          </Label>
          <SelectFinancialAccount />
          {values.financial_accounts_id && (
            <>
              <Label>Método de pago :</Label>
              <SelectPaymentMethod />
            </>
          )}
          <Label>Que deuda :</Label>
          <SelectDebt />
        </div>
      )}
    </div>
  );
};
