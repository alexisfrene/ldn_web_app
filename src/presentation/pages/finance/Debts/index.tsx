import React from 'react';
import { Icons, Label, Skeleton } from '@components';
import { useQuery } from '@tanstack/react-query';
import { getDebts } from '@services';
import { FormCreateDebt } from './FormCreateDebt';
import { CardDebt } from './CardDebt';

const Debts: React.FC = () => {
  const debts = useQuery({
    queryKey: ['debts'],
    queryFn: getDebts,
  });

  if (debts.isPending) {
    return (
      <div>
        <FormCreateDebt />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }
  if (debts.error) return 'An error has occurred: ';

  return (
    <div>
      <FormCreateDebt />
      {debts?.data.length ? (
        debts?.data.map(
          (debt: {
            total_paid: number;
            total_unpaid: number;
            total: number;
            name: string;
            notes: string;
            debt_id: UUID;
            interest_per_installment: number;
            total_interest: number;
            installments: [];
          }) => (
            <CardDebt
              debt_id={debt.debt_id}
              total_interest={debt.total_interest}
              installments={debt.installments}
              name={debt.name}
              notes={debt.notes}
              total={debt.total}
              total_paid={debt.total_paid}
              total_unpaid={debt.total_unpaid}
              interest_per_installment={debt.interest_per_installment}
              key={debt.debt_id}
            />
          ),
        )
      ) : (
        <div className="mx-auto mt-20 flex w-full flex-col justify-center">
          <Icons type="wrench_screwdriver" height={250} className="m-3 p-10" />
          <Label className="text-center text-2xl">
            No hay deudas que mostrar ...
          </Label>
        </div>
      )}
    </div>
  );
};
export default Debts;
