import React from 'react';
import { InfoCard, Skeleton } from '@components';
import { useIsMobile } from '@hooks';

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
  const isMobile = useIsMobile();
  return (
    <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
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
            title={isMobile ? 'Entrada del mes' : 'Total entradas en el mes'}
            value={totalMonth.data?.inflow_of_money || 0}
            currency={true}
            valueStyles="text-green-500 dark:text-green-500"
          />
          <InfoCard
            title={isMobile ? 'Salida del mes' : 'Total de salidas del mes'}
            value={totalMonth.data?.money_outflow || 0}
            currency={true}
            valueStyles="text-red-500 dark:text-red-500"
          />
          <InfoCard
            title={isMobile ? 'Ganancias' : 'Ganancias del mes'}
            value={
              (totalMonth.data?.inflow_of_money || 0) -
              (totalMonth.data?.money_outflow || 0)
            }
            currency={true}
          />
          <InfoCard
            title={isMobile ? 'Movimientos' : 'Total de movimientos en el mes'}
            value={totalMonth.data?.count_movements || 0}
          />
        </>
      )}
    </div>
  );
};
