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
import { formattedValue } from '@utils';

interface Props {
  debt_id: UUID;
  name: string;
  notes: string;
  total: number;
  total_paid: number;
  total_unpaid: number;
  total_interest: number;
  interest_per_installment: number;
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
  total_unpaid,
  total_paid,
  total,
  total_interest,
  interest_per_installment,
}) => {
  const isMobile = useIsMobile();

  return (
    <Card
      key={debt_id}
      className="my-3 bg-gradient-to-br from-amber-400/70 to-pink-300 transition delay-75 duration-300 ease-out hover:from-amber-400/50 hover:to-pink-300 dark:from-slate-900 dark:to-gray-700/60 dark:hover:bg-slate-700"
    >
      <CardHeader>
        <CardTitle className="flex justify-between text-2xl">
          <p className="truncate">
            {isMobile ? '' : ' Deuda : '} {name}
          </p>
          <div>
            <FormEditDebt debt_id={debt_id} />
            <ModalDeleteDebt debt_id={debt_id} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <div className="grid grid-cols-1 gap-4 rounded-lg p-4 sm:grid-cols-2 lg:grid-cols-3">
            <p className="text-lg font-semibold">
              Notas:{' '}
              <span className="font-normal text-gray-600">
                {notes || 'Sin Notas'}
              </span>
            </p>
            <p className="text-lg font-semibold">
              Total:{' '}
              <span className="font-normal text-green-600">
                {formattedValue(total) || 0}
              </span>
            </p>
            <p className="text-lg font-semibold">
              Cantidad de cuotas:{' '}
              <span className="font-normal text-gray-600">
                {installments.length}
              </span>
            </p>
            <p className="text-lg font-semibold">
              Total sin pagar:{' '}
              <span className="font-normal text-red-600">
                {formattedValue(total_unpaid) || 0}
              </span>
            </p>
            <p className="text-lg font-semibold">
              Total pagado:{' '}
              <span className="font-normal text-blue-600">
                {formattedValue(total_paid) || 0}
              </span>
            </p>
            <p className="text-lg font-semibold">
              Intereses:{' '}
              <span className="font-normal text-orange-600">
                {total_interest ? total_interest.toFixed(2) : 0}%
              </span>
            </p>
            <p className="text-lg font-semibold">
              Intereses por meses:{' '}
              <span className="font-normal text-orange-600">
                {interest_per_installment
                  ? interest_per_installment.toFixed(2)
                  : 0}
                %
              </span>
            </p>
          </div>
        </CardDescription>
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
