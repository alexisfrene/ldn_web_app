import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
} from '@components';
import { useQuery } from '@tanstack/react-query';
import { getDebts } from '@services';
import { FormCreateDebt } from './FormCreateDebt';
import { cn, formatDate } from '@utils';

const Debts: React.FC = () => {
  const debts = useQuery({
    queryKey: ['debts'],
    queryFn: getDebts,
  });

  if (debts.isPending) {
    return <Skeleton className="h-[65vh] w-[85vw]" />;
  }
  if (debts.error) return 'An error has occurred: ';

  return (
    <div>
      <FormCreateDebt />
      {debts?.data.map(
        (debt: { name: string; notes: string; installments: [] }) => (
          <Card>
            <CardHeader>
              <CardTitle>Deuda : {debt.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Notas : {debt.notes || 'Sin Notas'}
              </CardDescription>
              <div className="mt-3 flex gap-3">
                {debt?.installments.map(
                  (installment: {
                    installment_id: number;
                    status: string;
                    amount: number;
                    due_date: string;
                  }) => (
                    <div
                      key={installment.installment_id}
                      className={cn([
                        'bg-slate-700 p-3',
                        installment.status === 'paid' && 'bg-red-900',
                      ])}
                    >
                      <p>
                        {installment.status === 'paid'
                          ? 'Ya pagado'
                          : 'Sin Pagar'}
                      </p>
                      <p>Cuota {installment.installment_id}</p>
                      <p>Monto : {installment.amount}</p>
                      <p>
                        Fecha de vencimiento :
                        {formatDate(new Date(installment.due_date))}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        ),
      )}
    </div>
  );
};
export default Debts;
