import React from "react";
import { Label } from "@ui/label";
import { Skeleton } from "@ui/skeleton";
import { AnimatedPagination } from "@common/animated-pagination";
import { Icons } from "@common/icons";
import { CardExpense } from "@expenses-cards/expense-card";
import { CreateExpenseModal } from "@expenses-modals/create-expense-modal";
import { useGetExpenses } from "@expenses-hooks/use-get-expenses";

const Expense: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const { expenses, isLoading, totalPages, currentPage, isPlaceholderData } =
    useGetExpenses(page, 5);

  if (isLoading) {
    return (
      <div>
        <CreateExpenseModal />
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
      <CreateExpenseModal />
      <div className="flex flex-col gap-6 xl:grid xl:grid-cols-2">
        {expenses.length ? (
          expenses.map((expense: any) => (
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
      {!isLoading ? (
        <AnimatedPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setPage={setPage}
          onClickPrevious={() => setPage((old) => Math.max(old - 1, 0))}
          onClickNext={() => {
            if (!isPlaceholderData && currentPage < totalPages) {
              setPage((old) => old + 1);
            }
          }}
        />
      ) : (
        <div className="mt-1 flex w-full items-center justify-center gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      )}
    </div>
  );
};

export default Expense;
