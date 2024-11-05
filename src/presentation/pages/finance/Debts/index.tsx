import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
  Skeleton,
} from '@components';
import { useQuery } from '@tanstack/react-query';
import { getDebts } from '@services';
import { FormCreateDebt } from './FormCreateDebt';
import { cn, formattedValue } from '@utils';

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
        (debt: {
          name: string;
          notes: string;
          debt_id: UUID;
          installments: [];
        }) => (
          <Card key={debt.debt_id}>
            <CardHeader>
              <CardTitle>Deuda : {debt.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Notas : {debt.notes || 'Sin Notas'}
              </CardDescription>
              <div className="mt-3 grid grid-cols-4 gap-3">
                {debt?.installments.map(
                  (
                    installment: {
                      installment_id: number;
                      status: string;
                      amount: number;
                      due_date: string;
                    },
                    index,
                  ) => (
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
                      <p>
                        {installment.status === 'paid'
                          ? 'Ya pagado'
                          : 'Sin Pagar'}
                      </p>
                      <Separator />
                      <p>Monto : {formattedValue(installment.amount)}</p>
                      <Separator />
                      <p>
                        Fecha de vencimiento :
                        {new Date(installment.due_date).toLocaleDateString()}
                      </p>
                      <Separator />
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
