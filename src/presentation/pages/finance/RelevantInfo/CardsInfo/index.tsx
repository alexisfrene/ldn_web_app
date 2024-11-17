import React from 'react';
import { InfoCard, Skeleton } from '@components';
import { formattedValue } from '@utils';

interface TotalMonthData {
  inflow_of_money: number;
  money_outflow: number;
  count_movements: number;
}

interface Props {
  totalMonth: {
    data?: TotalMonthData;
    isPending: boolean;
  };
}

export const CardsInfo: React.FC<Props> = ({ totalMonth }) => {
  return (
    <div className="mb-3 grid grid-cols-4 gap-3">
      {totalMonth.isPending ? (
        <>
          <Skeleton className="col-span-1" />
          <Skeleton className="col-span-1" />
          <Skeleton className="col-span-1" />
          <Skeleton className="h-[130px] w-[320px]" />
        </>
      ) : (
        <>
          <InfoCard
            title="Total entradas en el mes"
            value={formattedValue(totalMonth.data?.inflow_of_money || 0)}
            currency={true}
            valueStyles="text-green-500"
          />
          <InfoCard
            title="Total de salidas del mes"
            value={formattedValue(totalMonth.data?.money_outflow || 0)}
            currency={true}
            valueStyles="text-red-500"
          />
          <InfoCard
            title="Ganancias del mes"
            value={formattedValue(
              (totalMonth.data?.inflow_of_money || 0) -
                (totalMonth.data?.money_outflow || 0),
            )}
            currency={true}
          />
          <InfoCard
            title="Total de movimientos en el mes"
            value={totalMonth.data?.count_movements}
          />
        </>
      )}
    </div>
  );
};
