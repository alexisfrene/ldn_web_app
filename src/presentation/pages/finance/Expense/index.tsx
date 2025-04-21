import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Icons, Label, Skeleton } from '@components';
import { getExpenses } from '@services';
import { CardExpense } from '@cards';
import { CreateExpenseForm } from '@forms';

const Expense: React.FC = () => {
  const expenses = useQuery({
    queryKey: ['expenses'],
    queryFn: getExpenses,
  });

  if (expenses.isPending) {
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
  if (expenses.error) return 'An error has occurred: ';

  return (
    <div>
      <CreateExpenseForm />
      <div className="flex flex-col gap-6 md:grid md:grid-cols-2">
        {expenses.data.length ? (
          expenses.data.map(
            (expense: {
              description: string;
              expense_id: UUID;
              name: string;
              money_outflow: number;
              count_movements: number;
              money_outflow_month: number;
              count_movements_month: number;
            }) => (
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
            ),
          )
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
