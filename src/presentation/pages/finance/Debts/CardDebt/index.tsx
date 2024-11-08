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
import { CardInstallment } from './CardInstallment';
import { FormEditDebt } from './FormEditDebt';

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
      className="my-3 bg-gradient-to-br from-amber-400/70 to-pink-300 transition delay-75 duration-300 ease-out hover:from-amber-400/50 hover:to-pink-300 dark:from-slate-900 dark:to-gray-700/60 dark:hover:bg-slate-700"
    >
      <CardHeader>
        <CardTitle className="flex justify-between">
          <p>Deuda : {name}</p>
          <FormEditDebt debt_id={debt_id} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Notas : {notes || 'Sin Notas'}</CardDescription>
        <div className="mt-3 grid grid-cols-4 gap-3">
          {installments.map((installment, index) => (
            <CardInstallment
              installment_id={installment.installment_id}
              amount={installment.amount}
              due_date={installment.due_date}
              quota_number={index}
              status={installment.status}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
