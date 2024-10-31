import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Icons,
} from '@components';
import { formattedValue } from '@utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFinancialAccount } from '@services';
interface Props {
  financial_accounts_id: string;
  name: string;
  total: number;
  paymentMethods: { name: string; payment_method_id: string }[];
}

export const FinancialAccountCard: React.FC<Props> = ({
  financial_accounts_id,
  name,
  total,
  paymentMethods,
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteFinancialAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['financial_accounts'],
      });
    },
  });
  return (
    <Card
      className="w-52 bg-gradient-to-br from-emerald-500 to-emerald-200 dark:from-teal-700 dark:to-green-600"
      key={financial_accounts_id}
    >
      <CardHeader>
        <CardTitle className="flex justify-between">
          {name}
          <AlertDialog>
            <AlertDialogTrigger className="relative">
              <div className="absolute -right-4 -top-3 opacity-70 transition-opacity hover:opacity-100">
                <Icons
                  type="close"
                  className="h-4 cursor-pointer hover:scale-105"
                />
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Estas seguro de eliminar esta cuenta financiera ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción es permanente
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel type="button">Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  type="button"
                  onClick={async () => mutation.mutate(financial_accounts_id)}
                >
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{formattedValue(total || 0)}</p>
        <div className="flex flex-wrap justify-between gap-1">
          {paymentMethods &&
            paymentMethods.map((paymentMethod) => (
              <div
                key={paymentMethod.payment_method_id}
                className="rounded-md bg-green-300 p-1"
              >
                {paymentMethod.name}
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};
