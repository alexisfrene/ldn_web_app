import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Icons,
  InfoCard,
  Label,
  Skeleton,
  PieChartComponent,
} from '@components';
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
      <div className="grid grid-cols-3 gap-3">
        <Label className="col-span-3 text-2xl">Información general</Label>
        <div className="col-span-3">
          <FormCreateDebt />
        </div>
        {debts?.data.debts.length ? (
          <>
            <InfoCard
              title="Total de deudas"
              value={debts?.data.debtsTotal}
              currency
            />
            <InfoCard
              title="Deudas pagadas"
              value={debts?.data.debtsTotalPaid}
              currency
              valueStyles="text-green-500 dark:text-green-500"
            />
            <InfoCard
              title="Deudas pendientes"
              value={debts?.data.debtsTotalUnpaid}
              currency
              valueStyles="text-red-500 dark:text-red-500"
            />
            <div className="col-span-3">
              <PieChartComponent
                title="Deudas Pagadas/Pendientes"
                description="Se muestra el porcentaje de deudas pagadas y pendientes"
                footer_title="Porcentaje de deudas pagadas y pendientes"
                dataKey="total"
                nameKey="debt_type"
                footer_description={`Deudas pagadas ${
                  debts?.data
                    ? (
                        (debts.data.debtsTotalPaid /
                          (debts.data.debtsTotalPaid +
                            debts.data.debtsTotalUnpaid)) *
                        100
                      ).toFixed(2)
                    : 0
                }% y pendientes ${
                  debts?.data
                    ? (
                        (debts.data.debtsTotalUnpaid /
                          (debts.data.debtsTotalPaid +
                            debts.data.debtsTotalUnpaid)) *
                        100
                      ).toFixed(2)
                    : 0
                }%`}
                chartData={[
                  {
                    debt_type: 'Pagado: $',
                    total: debts?.data.debtsTotalPaid,
                    fill: 'green',
                  },
                  {
                    debt_type: 'Pendiente: $',
                    total: debts?.data.debtsTotalUnpaid,
                    fill: 'red',
                  },
                ]}
              />
            </div>
          </>
        ) : null}
      </div>
      {debts?.data.debts.length ? (
        debts?.data.debts.map(
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
