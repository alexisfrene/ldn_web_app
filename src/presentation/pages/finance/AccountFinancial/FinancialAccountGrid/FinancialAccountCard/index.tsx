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
import { cn, formattedValue } from '@utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFinancialAccount } from '@services';
interface Props {
  type: string;
  financial_accounts_id: string;
  name: string;
  total: number;
}

export const FinancialAccountCard: React.FC<Props> = ({
  financial_accounts_id,
  name,
  total,
  type,
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
      className={cn([
        'w-52',
        `${type === 'inflow_of_money' ? 'bg-gradient-to-br from-emerald-500 to-emerald-200 dark:from-teal-700 dark:to-green-600' : type === 'debt' ? 'bg-gradient-to-br from-cyan-700 to-blue-600 dark:from-cyan-700 dark:to-blue-700' : 'bg-gradient-to-br from-red-400 to-red-200 dark:from-red-700 dark:to-amber-600'}`,
      ])}
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
      </CardContent>
    </Card>
  );
};
