import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
} from '@components';
import { cn, formattedValue } from '@utils';
import React from 'react';

interface Props {
  installment_id: number;
  quota_number: number;
  amount: number;
  due_date: string;
  status: string;
}

const statusColors = {
  paid: 'bg-rose-600/60 dark:bg-red-950',
  pending:
    'bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-500 cursor-pointer delay-75',
};

export const CardInstallment: React.FC<Props> = ({
  installment_id,
  quota_number,
  amount,
  due_date,
  status,
}) => {
  const cardStatus = status === 'paid' ? 'paid' : 'pending';

  return (
    <Card
      key={`installment_${installment_id}`}
      className={cn([statusColors[cardStatus]])}
    >
      <CardHeader>
        <CardTitle>Cuota número {quota_number + 1}</CardTitle>
        <CardDescription>
          {status === 'paid' ? 'Ya pagado' : 'Sin Pagar'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Label>Monto:</Label>
          <p>{formattedValue(amount)}</p>
        </div>
        <div className="flex items-center justify-between">
          <Label>Fecha de vencimiento:</Label>
          <p>{new Date(due_date).toLocaleDateString()}</p>
        </div>
      </CardContent>
    </Card>
  );
};
