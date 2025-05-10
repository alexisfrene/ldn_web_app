import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FormikValues, useFormikContext } from "formik";
import { getExpenses } from "@services";
import { Badge } from "@ui/badge";
import { Label } from "@ui/label";

export const SelectTag: React.FC = () => {
  const { setFieldValue } = useFormikContext<FormikValues>();
  const [selectedExpenseId, setSelectedExpenseId] = useState<UUID | null>(null);

  const {
    data: expenses,

    error,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

  if (error) {
    return (
      <div>Error: {(error as Error).message || "An error has occurred"}</div>
    );
  }

  const handleSelectExpense = (expenseId: UUID) => {
    setFieldValue("expense_id", expenseId);
    setSelectedExpenseId(expenseId);
  };

  return (
    <div className="my-3">
      {expenses?.length ? (
        expenses?.map((expense: { description: string; expense_id: UUID }) => (
          <Badge
            key={expense.expense_id}
            variant={
              selectedExpenseId === expense.expense_id ? "default" : "outline"
            }
            className="cursor-pointer"
            onClick={() => handleSelectExpense(expense.expense_id)}
          >
            {expense.description}
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
