import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Separator,
} from '@components';
import { formattedValue } from '@utils';
import React from 'react';

interface Props {
  description: string;
  expense_id: string;
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
      className="bg-gradient-to-br from-amber-400/70 to-pink-300 dark:from-rose-700 dark:to-pink-700"
    >
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description || ''}</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};
