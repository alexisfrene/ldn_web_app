import React, { useState } from "react";
import { FormikValues, useFormikContext } from "formik";
import { Badge } from "@ui/badge";
import { Label } from "@ui/label";
import { useGetExpenses } from "@expenses-hooks/use-get-expenses";

export const SelectExpense: React.FC = () => {
  const { setFieldValue } = useFormikContext<FormikValues>();
  const [selectedExpenseId, setSelectedExpenseId] = useState<UUID | null>(null);

  const { expenses } = useGetExpenses(1, 20);

  const handleSelectExpense = (expenseId: UUID) => {
    setFieldValue("expense_id", expenseId);
    setSelectedExpenseId(expenseId);
  };

  return (
    <div className="my-3">
      {expenses?.length ? (
        expenses?.map((expense: { name: string; expense_id: UUID }) => (
          <Badge
            key={expense.expense_id}
            variant={
              selectedExpenseId === expense.expense_id ? "default" : "outline"
            }
            className="cursor-pointer"
            onClick={() => handleSelectExpense(expense.expense_id)}
          >
            {expense.name}
          </Badge>
        ))
      ) : (
        <div>
          <Label>Esta cuenta no tiene etiqueta cargada ....</Label>
        </div>
      )}
    </div>
  );
};
