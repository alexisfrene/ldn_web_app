import React, { Suspense } from "react";
import { Label } from "@ui/label";
import { Skeleton } from "@ui/skeleton";
import { Icons } from "@common/Icons";
import { InfoCard } from "@components/cards/general-cards";
import { CardDebt } from "@debts-cards/debt-card";
import { CreateDebtModal } from "@debts-modals/create-debt-modal";
import { useGetDebts } from "@debts-hooks/use-get-debts";

const PieChartComponent = React.lazy(() => import("@common/PieChart"));

const Debts: React.FC = () => {
  const { debts, isLoading } = useGetDebts();

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
      <div className="grid grid-cols-3 gap-3">
        <Label className="col-span-3 text-2xl">Información general</Label>
        <div className="col-span-3">
          <CreateDebtModal />
        </div>
        {debts?.debts.length ? (
          <>
            <InfoCard
              title="Total de deudas"
              value={debts?.debtsTotal}
              currency
            />
            <InfoCard
              title="Deudas pagadas"
              value={debts?.debtsTotalPaid}
              currency
              valueStyles="text-green-500 dark:text-green-500"
            />
            <InfoCard
              title="Deudas pendientes"
              value={debts?.debtsTotalUnpaid}
              currency
              valueStyles="text-red-500 dark:text-red-500"
            />
            <div className="col-span-3">
              <Suspense fallback={<Skeleton className="h-96 w-full" />}>
                <PieChartComponent
                  title="Deudas Pagadas/Pendientes"
                  description="Se muestra el porcentaje de deudas pagadas y pendientes"
                  footer_title="Porcentaje de deudas pagadas y pendientes"
                  dataKey="total"
                  nameKey="debt_type"
                  footer_description={`Deudas pagadas ${
                    debts
                      ? (
                          (debts.debtsTotalPaid /
                            (debts.debtsTotalPaid + debts.debtsTotalUnpaid)) *
                          100
                        ).toFixed(2)
                      : 0
                  }% y pendientes ${
                    debts
                      ? (
                          (debts.debtsTotalUnpaid /
                            (debts.debtsTotalPaid + debts.debtsTotalUnpaid)) *
                          100
                        ).toFixed(2)
                      : 0
                  }%`}
                  chartData={[
                    {
                      debt_type: "Pagado: $",
                      total: debts?.debtsTotalPaid,
                      fill: "green",
                    },
                    {
                      debt_type: "Pendiente: $",
                      total: debts?.debtsTotalUnpaid,
                      fill: "red",
                    },
                  ]}
                />
              </Suspense>
            </div>
          </>
        ) : null}
      </div>
      {debts?.debts.length ? (
        debts?.debts.map((debt) => (
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
        ))
      ) : (
        <div className="mx-auto mt-20 flex w-full flex-col justify-center">
          <Icons type="wrench_screwdriver" height={250} className="m-3 p-10" />
        </div>
      )}
    </div>
  );
};
export default Debts;
