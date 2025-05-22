import React, { Suspense } from "react";
import { Label } from "@ui/label";
import { Skeleton } from "@ui/skeleton";
import { AnimatedPagination } from "@common/animated-pagination";
import { Icons } from "@common/icons";
import { InfoCard } from "@components/cards/general-cards";
import { CardDebt } from "@debts-cards/debt-card";
import { CreateDebtModal } from "@debts-modals/create-debt-modal";
import { useGetDebts } from "@debts-hooks/use-get-debts";

const PieChartComponent = React.lazy(() => import("@common/pie-chart"));

const Debts: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const {
    debts,
    isLoading,
    totalPaid,
    total,
    totalUnpaid,
    totalPages,
    isFetching,
    isPlaceholderData,
    currentPage,
  } = useGetDebts(page, 2);

  if (isLoading) {
    return (
      <div>
        <CreateDebtModal />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div>
      <div>
        <Label className="col-span-3 text-2xl">Información general</Label>
        <div className="col-span-3">
          <CreateDebtModal />
        </div>
        {debts?.length ? (
          <div className="grid grid-cols-3 gap-3 mt-3">
            <InfoCard title="Total" value={total} currency />
            <InfoCard
              title="Pagadas"
              value={totalPaid}
              currency
              valueStyles="text-green-500 dark:text-green-500"
            />
            <InfoCard
              title="Pendientes"
              value={totalUnpaid}
              currency
              valueStyles="text-red-500 dark:text-red-500"
            />
            <div className="col-span-3">
              <Suspense fallback={<Skeleton className="h-96 w-full" />}>
                <PieChartComponent
                  title="Deudas Pagadas/Pendientes"
                  description="Se muestra el porcentaje de deudas pagadas y pendientes"
                  footer_title="Porcentaje de deudas pagadas y pendientes"
                  footer_description={`Deudas pagadas ${
                    debts
                      ? ((totalPaid / (totalPaid + totalUnpaid)) * 100).toFixed(
                          2,
                        )
                      : 0
                  }% y pendientes ${
                    debts
                      ? (
                          (totalUnpaid / (totalPaid + totalUnpaid)) *
                          100
                        ).toFixed(2)
                      : 0
                  }%`}
                  chartData={[
                    {
                      title: `Pagado : $${totalPaid}`,
                      value: totalPaid,
                      color: "green",
                    },
                    {
                      title: `Pendiente : $${totalUnpaid}`,
                      value: totalUnpaid,
                      color: "red",
                    },
                  ]}
                />
              </Suspense>
            </div>
          </div>
        ) : null}
      </div>
      {debts?.length ? (
        <div>
          {debts?.map(
            (debt: {
              debt_id: UUID;
              total_interest: number;
              installments: {
                installment_id: number;
                amount: number;
                due_date: string;
                status: string;
              }[];
              name: string;
              notes: string;
              total: number;
              total_paid: number;
              total_unpaid: number;
              interest_per_installment: number;
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
          )}
          {isFetching && <Skeleton className="col-span-1 rounded-xl" />}
          <div className="col-span-full">
            {!isLoading ? (
              <AnimatedPagination
                currentPage={currentPage}
                totalPages={totalPages}
                setPage={setPage}
                onClickPrevious={() => setPage((old) => Math.max(old - 1, 0))}
                onClickNext={() => {
                  if (!isPlaceholderData && currentPage < totalPages) {
                    setPage((old) => old + 1);
                  }
                }}
              />
            ) : (
              <div className="mt-1 flex w-full items-center justify-center gap-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-20 flex w-full flex-col justify-center">
          <Icons type="wrench_screwdriver" height={250} className="m-3 p-10" />
        </div>
      )}
    </div>
  );
};
export default Debts;
