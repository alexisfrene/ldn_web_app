import React from 'react';
import { formattedValue } from '@utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Separator,
} from '@components';
import { FormEditExpense } from './FormEditExpense';
import { ExpenseDetail } from './ExpenseDetail';
import { DeleteExpense } from './DeleteExpense';
import { useIsMobile } from '@hooks';

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
  return (
    <Card
      key={expense_id}
      className="bg-gradient-to-br from-amber-400/70 to-pink-300 transition delay-200 duration-300 ease-out hover:scale-[1.02] hover:from-amber-400/50 hover:to-pink-300 dark:from-pink-800/70 dark:to-slate-900/90 dark:hover:bg-red-900"
    >
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            <p>{name}</p>
            <div>
              <FormEditExpense
                description={description}
                name={name}
                expense_id={expense_id}
              />
              <DeleteExpense expense_id={expense_id} />
            </div>
          </div>
        </CardTitle>
        <CardDescription className="text-left">
          {description || ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ExpenseDetail name={name} expense_id={expense_id}>
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
        </ExpenseDetail>
      </CardContent>
    </Card>
  );
};
