import React from 'react';
import { formattedValue } from '@utils';
import {
  AlertModal,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icons,
  Label,
  Separator,
} from '@components';
import {
  EditExpenseModal,
  ExpenseDetailModal,
} from '@presentation/components/modals';
import { useIsMobile } from '@hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteExpense } from '@services';

interface Props {
  description: string;
  expense_id: UUID;
  name: string;
  money_outflow: number;
  count_movements: number;
  money_outflow_month: number;
  count_movements_month: number;
}

export const CardExpense: React.FC<Props> = ({
  expense_id,
  name,
  description,
  count_movements,
  money_outflow,
  count_movements_month,
  money_outflow_month,
}) => {
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['expenses'],
      });
    },
  });
  return (
    <Card
      key={expense_id}
      className="bg-linear-to-br from-amber-400/70 to-pink-300 transition delay-200 duration-300 ease-out hover:scale-[1.02] hover:from-amber-400/50 hover:to-pink-300 dark:from-pink-800/70 dark:to-slate-900/90 dark:hover:bg-red-900"
    >
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            <p>{name}</p>
            <div className="relative grid grid-cols-2 gap-3">
              <AlertModal
                trigger={
                  <Icons
                    type="trash"
                    className="cursor-pointer opacity-70 transition-opacity hover:scale-105 hover:opacity-100"
                  />
                }
                title="Eliminar esta cuenta financiera?"
                description="Esta acción es permanente"
                onConfirm={() => deleteMutation.mutate(expense_id)}
              />
              <EditExpenseModal
                description={description}
                name={name}
                expense_id={expense_id}
              />
            </div>
          </div>
        </CardTitle>
        <CardDescription className="text-left">
          {description || ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ExpenseDetailModal name={name} expense_id={expense_id}>
          <div className="flex items-center justify-between">
            <Label className="text-xs md:text-base">
              {isMobile
                ? 'Cantidad de movimientos:'
                : 'Cantidad de movimientos para este gasto:'}
            </Label>
            <p className="md:text-xl">{count_movements}</p>
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-xs md:text-base">Total de gastos:</Label>
            <p className="md:text-xl">{formattedValue(money_outflow)}</p>
          </div>
          <Separator className="dark:bg-slate-200" />
          <div className="flex items-center justify-between">
            <Label className="text-xs md:text-base">
              {isMobile
                ? 'Cantidad de movimientos ( mes ):'
                : 'Cantidad de movimientos para este gasto ( mes ):'}
            </Label>
            <p className="md:text-xl">{count_movements_month}</p>
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-xs md:text-base">
              {isMobile
                ? 'Total de gastos ( mes ):'
                : 'Total de gastos para este gasto ( mes ):'}
            </Label>
            <p className="md:text-xl">{formattedValue(money_outflow_month)}</p>
          </div>
        </ExpenseDetailModal>
      </CardContent>
    </Card>
  );
};
