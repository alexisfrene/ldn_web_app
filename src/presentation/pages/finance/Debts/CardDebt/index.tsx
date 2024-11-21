import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components';
import { CardInstallment } from './CardInstallment';
import { FormEditDebt } from './FormEditDebt';
import { ModalDeleteDebt } from './ModalDeleteDebt';
import { useIsMobile } from '@hooks';

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
  const isMobile = useIsMobile();
  return (
    <Card
      key={debt_id}
      className="my-3 bg-gradient-to-br from-amber-400/70 to-pink-300 transition delay-75 duration-300 ease-out hover:from-amber-400/50 hover:to-pink-300 dark:from-slate-900 dark:to-gray-700/60 dark:hover:bg-slate-700"
    >
      <CardHeader>
        <CardTitle className="flex justify-between">
          <p className="truncate">
            {isMobile ? '' : ' Deuda :'}
            {name}
          </p>
          <div>
            <FormEditDebt debt_id={debt_id} />
            <ModalDeleteDebt debt_id={debt_id} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Notas : {notes || 'Sin Notas'}</CardDescription>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-4">
          {installments.map((installment, index) => (
            <CardInstallment
              installment_id={installment.installment_id}
              amount={installment.amount}
              due_date={installment.due_date}
              quota_number={index}
              status={installment.status}
              key={installment.installment_id}
              debt_id={debt_id}
              debt_name={name}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
