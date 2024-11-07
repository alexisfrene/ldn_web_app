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
  return (
    <Card
      key={expense_id}
      className="bg-gradient-to-br from-amber-400/70 to-pink-300 transition delay-200 duration-300 ease-out hover:scale-[1.02] hover:from-amber-400/50 hover:to-pink-300 dark:from-pink-800/70 dark:to-slate-900/90 dark:hover:bg-red-900"
    >
      <CardContent>
        <CardTitle className="mt-6">
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
        <ExpenseDetail name={name} expense_id={expense_id}>
          <CardDescription className="text-left">
            {description || ''}
          </CardDescription>
          <div className="flex items-center justify-between">
            <Label>Cantidad de movimientos para este gasto:</Label>
            <p className="text-xl">{count_movements}</p>
          </div>
          <div className="flex items-center justify-between">
            <Label>Total de gastos:</Label>
            <p className="text-xl">{formattedValue(money_outflow)}</p>
          </div>
          <Separator className="dark:bg-slate-200" />
          <div className="flex items-center justify-between">
            <Label>Cantidad de movimientos para este gasto ( mes ):</Label>
            <p className="text-xl">{count_movements_month}</p>
          </div>
          <div className="flex items-center justify-between">
            <Label>Total de gastos ( mes ):</Label>
            <p className="text-xl">{formattedValue(money_outflow_month)}</p>
          </div>
        </ExpenseDetail>
      </CardContent>
    </Card>
  );
};
