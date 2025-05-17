import React from "react";
import { formattedValue } from "@utils";
import { useIsMobile } from "@hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { AlertModal } from "@common/alert-modal";
import { Icons } from "@components/common/icons";
import { FormEditDebt } from "@debts-forms/edit-debt-form";
import { MarkPaidFeeModal } from "@debts-forms/mark-paid-fee-modal";
import { useDeleteDebt } from "@debts-hooks/use-delete-debt";

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
  const mutation = useDeleteDebt();
  return (
    <Card
      key={debt_id}
      className="my-3 bg-linear-to-br from-amber-400/70 to-pink-300 transition delay-75 duration-300 ease-out hover:from-amber-400/50 hover:to-pink-300 dark:from-slate-900 dark:to-gray-700/60 dark:hover:bg-slate-700"
    >
      <CardHeader>
        <CardTitle className="flex justify-between text-2xl">
          <p className="truncate">
            {isMobile ? "" : " Deuda : "} {name}
          </p>
          <div>
            <FormEditDebt debt_id={debt_id} />
            <AlertModal
              trigger={
                <Icons
                  type="close"
                  className="absolute -top-2 -right-4 h-4 cursor-pointer opacity-70 transition-opacity hover:scale-105 hover:opacity-100"
                />
              }
              title="Eliminar deuda"
              description="Esta acción es permanente, estas seguro ?"
              onConfirm={() => mutation.mutate(debt_id)}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <div className="grid grid-cols-1 gap-4 rounded-lg p-4 sm:grid-cols-2 lg:grid-cols-3">
            <p className="text-lg font-semibold">
              Notas:
              <span className="font-normal text-gray-600">
                {notes || "Sin Notas"}
              </span>
            </p>
            <p className="text-lg font-semibold">
              Total:
              <span className="font-normal text-green-600">
                {formattedValue(total) || 0}
              </span>
            </p>
            <p className="text-lg font-semibold">
              Cantidad de cuotas:
              <span className="font-normal text-gray-600">
                {installments.length}
              </span>
            </p>
            <p className="text-lg font-semibold">
              Total sin pagar:
              <span className="font-normal text-red-600">
                {formattedValue(total_unpaid) || 0}
              </span>
            </p>
            <p className="text-lg font-semibold">
              Total pagado:
              <span className="font-normal text-blue-600">
                {formattedValue(total_paid) || 0}
              </span>
            </p>
            <p className="text-lg font-semibold">
              Intereses:
              <span className="font-normal text-orange-600">
                {total_interest ? total_interest.toFixed(2) : 0}%
              </span>
            </p>
            <p className="text-lg font-semibold">
              Intereses por meses:
              <span className="font-normal text-orange-600">
                {interest_per_installment
                  ? interest_per_installment.toFixed(2)
                  : 0}
                %
              </span>
            </p>
          </div>
        </CardDescription>
        <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {installments.map((installment, index) => (
            <MarkPaidFeeModal
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
