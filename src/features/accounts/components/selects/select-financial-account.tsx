import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FormikValues, useFormikContext } from "formik";
import { formattedValue } from "@utils";
import { Badge } from "@ui/badge";
import { Label } from "@ui/label";
import { getAllFinancialAccount } from "@accounts-services/index";

export const SelectFinancialAccount: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<FormikValues>();

  const { data: financialAccount, error } = useQuery({
    queryKey: ["finances", "financial_account"],
    queryFn: getAllFinancialAccount,
  });

  if (error) {
    return (
      <div>Error: {(error as Error).message || "An error has occurred"}</div>
    );
  }

  const handleSelectFinancialAccount = ({
    financial_accounts_id,
    total,
  }: {
    financial_accounts_id: UUID;
    total: number;
  }) => {
    setFieldValue("financial_accounts_id", financial_accounts_id);
    setFieldValue("total", total);
    setFieldValue("payment_method_id", null);
  };

  return (
    <div className="my-3 grid w-full grid-cols-2 gap-3 md:grid-cols-3">
      {financialAccount?.length ? (
        financialAccount?.map((financialAccount) => (
          <div
            key={financialAccount.financial_accounts_id}
            className={`flex cursor-pointer flex-col items-center gap-2 rounded-md px-2 py-3 ${
              values.financial_accounts_id ===
              financialAccount.financial_accounts_id
                ? "bg-blue-300 dark:bg-slate-700"
                : "bg-gray-200 hover:bg-gray-300 dark:bg-slate-900 dark:hover:bg-slate-800"
            }`}
            onClick={() =>
              handleSelectFinancialAccount({
                financial_accounts_id:
                  financialAccount.financial_accounts_id as UUID,
                total: financialAccount.total,
              })
            }
          >
            <Label>{financialAccount.name}</Label>
            <Label>{formattedValue(financialAccount.total)}</Label>
            <div className="grid grid-cols-2 gap-1">
              {financialAccount?.paymentMethods.map((paymentMethod) => (
                <Badge key={paymentMethod.payment_method_id}>
                  {paymentMethod.name}
                </Badge>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div> sas </div> //Poner boton de agregar cuenta financiera
      )}
    </div>
  );
};
