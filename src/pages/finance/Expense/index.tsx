import React from "react";
import { Label } from "@ui/label";
import { Skeleton } from "@ui/skeleton";
import { Icons } from "@components/common/icons";
import { CardExpense } from "@expenses-cards/expense-card";
import { CreateExpenseForm } from "@expenses-forms/create-expense-form";
import { useGetExpenses } from "@expenses-hooks/use-get-expenses";

const Expense: React.FC = () => {
  const { expenses, isLoading } = useGetExpenses();

  if (isLoading) {
    return (
      <div>
        <CreateExpenseForm />
        <div className="grid grid-cols-2 gap-6">
          <Skeleton className="col-span-1 h-[230px] px-6" />
          <Skeleton className="col-span-1 h-[230px]" />
          <Skeleton className="col-span-1 h-[230px]" />
          <Skeleton className="col-span-1 h-[230px]" />
          <Skeleton className="col-span-1 h-[230px]" />
          <Skeleton className="col-span-1 h-[230px]" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <CreateExpenseForm />
      <div className="flex flex-col gap-6 xl:grid xl:grid-cols-2">
        {expenses.length ? (
          expenses.map((expense) => (
            <CardExpense
              count_movements={expense.count_movements}
              count_movements_month={expense.count_movements_month}
              description={expense.description}
              expense_id={expense.expense_id}
              money_outflow={expense.money_outflow}
              money_outflow_month={expense.money_outflow_month}
              name={expense.name}
              key={expense.expense_id}
            />
          ))
        ) : (
          <div className="col-span-2 mx-auto mt-20">
            <Icons
              type="wrench_screwdriver"
              height={250}
              className="m-3 p-10"
            />
            <Label className="text-center text-2xl">
              No hay gastos que mostrar ...
            </Label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expense;
