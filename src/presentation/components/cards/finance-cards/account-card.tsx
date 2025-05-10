import React from "react";
import { formattedValue } from "@utils";
import { EditFinancialAccountDialog } from "@modals";
import { useDeleteAccount } from "@hooks";
import {
  AlertModal,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Icons,
} from "@components";

interface Props {
  financial_accounts_id: UUID;
  name: string;
  total: number;
  paymentMethods: { name: string; payment_method_id: number }[];
}

export const FinancialAccountCard: React.FC<Props> = ({
  financial_accounts_id,
  name,
  total,
  paymentMethods,
}) => {
  const mutation = useDeleteAccount();
  const pays = paymentMethods.map((p) => p.payment_method_id);

  return (
    <Card className="bg-linear-to-br from-amber-500/30 to-emerald-200 dark:from-teal-700 dark:to-green-600">
      <CardHeader>
        <CardTitle className="m-1 flex justify-between md:m-0">
          {name}
          <div className="relative flex items-center justify-center">
            <EditFinancialAccountDialog
              name={name}
              financial_accounts_id={financial_accounts_id}
              pays={pays}
            />
            <AlertModal
              trigger={
                <Icons
                  type="close"
                  className="absolute -top-2 -right-4 h-4 cursor-pointer opacity-70 transition-opacity hover:scale-105 hover:opacity-100"
                />
              }
              title="Eliminar esta cuenta financiera?"
              description="Esta acción es permanente"
              onConfirm={() => mutation.mutate(financial_accounts_id)}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2 text-xl font-semibold">
          {formattedValue(total || 0)}
        </p>
        <div className="flex flex-wrap gap-1">
          {paymentMethods.map((paymentMethod) => (
            <Badge
              key={paymentMethod.payment_method_id}
              className="bg-emerald-500/70 dark:bg-emerald-200"
            >
              {paymentMethod.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
