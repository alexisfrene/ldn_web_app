import React from 'react';
import { Skeleton } from '@components';
import { getExpenses } from '@services';
import { useQuery } from '@tanstack/react-query';
import { CardExpense } from './CardExpense';
import { FormCreateExpense } from './FormCreateExpense';

const Expense: React.FC = () => {
  const expenses = useQuery({
    queryKey: ['expenses'],
    queryFn: getExpenses,
  });

  if (expenses.isPending) {
    return <Skeleton className="h-[65vh] w-[85vw]" />;
  }
  if (expenses.error) return 'An error has occurred: ';

  return (
    <div>
      <FormCreateExpense />
      <div className="grid grid-cols-2 gap-6">
        {expenses.data.map(
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
        )}
      </div>
    </div>
  );
};

export default Expense;
