import React from "react";
import { cn } from "@utils";
import { InfoCard } from "@cards";
import { useGetMovementsPerMonth, useIsMobile } from "@hooks";
import { Skeleton } from "@components";

export const CardsInfo: React.FC = () => {
  const isMobile = useIsMobile();
  const { movement_per_month, isLoading } = useGetMovementsPerMonth();

  return (
    <div className="mb-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {isLoading ? (
        <>
          <Skeleton className="col-span-1" />
          <Skeleton className="col-span-1" />
          <Skeleton className="col-span-1" />
          <Skeleton className="h-[130px] w-[320px]" />
        </>
      ) : (
        <>
          <InfoCard
            title={isMobile ? "Entrada del mes" : "Total entradas en el mes"}
            value={movement_per_month?.inflow_of_money || 0}
            currency={true}
            valueStyles="text-green-500 dark:text-green-500"
          />
          <InfoCard
            title={isMobile ? "Salida del mes" : "Total de salidas del mes"}
            value={movement_per_month?.money_outflow || 0}
            currency={true}
            valueStyles="text-red-500 dark:text-red-500"
          />
          <InfoCard
            title={isMobile ? "Ganancias" : "Ganancias del mes"}
            value={movement_per_month?.different || 0}
            currency
            valueStyles={cn([
              movement_per_month?.different && movement_per_month?.different > 0
                ? "text-green-500 dark:text-green-500"
                : "text-red-500 dark:text-red-500",
            ])}
          />
          <InfoCard
            title={isMobile ? "Movimientos" : "Total de movimientos en el mes"}
            value={movement_per_month?.count_movements || 0}
          />
        </>
      )}
    </div>
  );
};
