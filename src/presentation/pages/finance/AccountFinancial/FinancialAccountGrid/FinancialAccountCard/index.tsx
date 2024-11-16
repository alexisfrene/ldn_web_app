import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@components';
import { formattedValue } from '@utils';
import { useLoading } from '@hooks';
import { EditFinancialAccountDialog } from './Dialog/EditFinancialAccountDialog';
import { DeleteFinancialAccountDialog } from './Dialog/DeleteFinancialAccountDialog';

import {
  deleteFinancialAccount,
  editFinancialAccount,
  getAllPaymentMethodForUser,
} from '@services';

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
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteFinancialAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['financial_accounts'],
      });
    },
  });
  const { doneLoading, startLoading } = useLoading();
  const editMutation = useMutation({
    mutationFn: editFinancialAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['financial_accounts'],
      });
    },
  });
  const paymentMethod = useQuery({
    queryKey: ['payment_method'],
    queryFn: () => getAllPaymentMethodForUser(),
  });

  if (paymentMethod.isPending) {
    startLoading();
  }
  if (paymentMethod.isSuccess) {
    doneLoading();
  }
  if (paymentMethod.error) return 'An error has occurred: ';

  const pays = paymentMethods.map((p) => p.payment_method_id.toString());

  return (
    <Card className="bg-gradient-to-br from-amber-500/30 to-emerald-200 dark:from-teal-700 dark:to-green-600">
      <CardHeader>
        <CardTitle className="flex justify-between">
          {name}
          <div>
            <EditFinancialAccountDialog
              name={name}
              financial_accounts_id={financial_accounts_id}
              editMutation={editMutation}
              paymentMethodQuery={paymentMethod}
              pays={pays}
            />
            <DeleteFinancialAccountDialog
              financial_accounts_id={financial_accounts_id}
              deleteMutation={deleteMutation}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2 text-xl font-semibold">
          {formattedValue(total || 0)}
        </p>
        <div className="flex flex-wrap justify-between gap-1">
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
