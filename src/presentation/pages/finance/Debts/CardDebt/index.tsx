import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
} from '@components';

import { cn, formattedValue } from '@utils';

interface Props {
  debt_id: UUID;
  name: string;
  notes: string;
  installments: {
    installment_id: number;
    status: string;
    amount: number;
    due_date: string;
  }[];
}

export const CardDebt: React.FC<Props> = ({
  debt_id,
  name,
  notes,
  installments,
}) => {
  return (
    <Card
      key={debt_id}
      className="bg-gradient-to-br from-amber-400/70 to-pink-300 transition delay-200 duration-300 ease-out hover:from-amber-400/50 hover:to-pink-300 dark:from-pink-800/70 dark:to-slate-900/90 dark:hover:bg-red-900"
    >
      <CardHeader>
        <CardTitle>Deuda : {name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Notas : {notes || 'Sin Notas'}</CardDescription>
        <div className="mt-3 grid grid-cols-4 gap-3">
          {installments.map((installment, index) => (
            <div
              key={`installment_${installment.installment_id}`}
              className={cn([
                'rounded-md bg-slate-200 p-3 dark:bg-slate-700',
                installment.status === 'paid' &&
                  'bg-rose-600/60 dark:bg-red-950',
              ])}
            >
              <p>Cuota numero {index + 1}</p>
              <Separator />
              <p>{installment.status === 'paid' ? 'Ya pagado' : 'Sin Pagar'}</p>
              <Separator />
              <p>Monto : {formattedValue(installment.amount)}</p>
              <Separator />
              <p>
                Fecha de vencimiento :
                {new Date(installment.due_date).toLocaleDateString()}
              </p>
              <Separator />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
