import React from "react";
import { FormikValues, useFormikContext } from "formik";
import { Label } from "@ui/label";
import { SelectFinancialAccount } from "@accounts-selects/select-financial-account";
import { SelectDebt } from "@debts-selects/select-debt";
import { SelectTag } from "@expenses-selects/select-expense";
import { SelectPaymentMethod } from "@payment-methods-selects/select-payment-method";

export const SelectMovementAccount: React.FC = () => {
  const { values } = useFormikContext<FormikValues>();

  return (
    <div>
      {values.type === "inflow_of_money" ? (
        <div className="w-full items-center gap-1.5">
          <Label>Destino donde ingresara el dinero</Label>
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
          <Label>Cuenta donde saldrá el dinero :</Label>
          <SelectFinancialAccount />
          {values.financial_accounts_id && (
            <>
              <Label>Método de pago :</Label>
              <SelectPaymentMethod />
            </>
          )}
          <Label>Etiqueta del gasto :</Label>
          <SelectTag />
        </div>
      ) : (
        <div className="w-full items-center gap-1.5">
          <Label>Cuenta donde saldrá el dinero :</Label>
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
