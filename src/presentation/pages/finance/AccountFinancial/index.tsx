import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FormCreateAccount } from './FormCreateAccount';
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
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Icons,
  LoadingIndicator,
} from '@components';
import { deleteFinancialAccount, getAllFinancialAccount } from '@services';
import { cn, formattedValue } from '@utils';

const AccountFinancial: React.FC = () => {
  const financialAccount = useQuery({
    queryKey: ['financial_accounts'],
    queryFn: getAllFinancialAccount,
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteFinancialAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['financial_accounts'],
      });
    },
  });

  if (financialAccount.isPending) {
    return <LoadingIndicator isLoading />;
  }
  if (financialAccount.error) return 'An error has occurred: ';

  return (
    <Card className="min-h-[70vh] border-none">
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              size="icon"
              className="bg-green-100 hover:bg-green-300 dark:bg-slate-600 dark:hover:bg-slate-500"
            >
              <Icons type="plus_circle" className="dark:text-slate-300" />
            </Button>
          </DialogTrigger>
          <DialogContent className="h-[80vh] max-w-5xl">
            <DialogHeader>
              <DialogTitle>Crear nueva cuenta financiera :</DialogTitle>
              <DialogDescription>
                Aquí puede crear una nueva cuenta financiera.
              </DialogDescription>
            </DialogHeader>
            <FormCreateAccount />
          </DialogContent>
        </Dialog>
        <div className="flex flex-wrap gap-1">
          {financialAccount.data.length ? (
            financialAccount.data.map(
              (account: {
                name: string;
                type: string;
                financial_accounts_id: string;
                total: number;
              }) => (
                <Card
                  className={cn([
                    'w-52',
                    `${account.type === 'inflow_of_money' ? 'bg-gradient-to-br from-emerald-500 to-emerald-200 dark:from-teal-700 dark:to-green-600' : account.type === 'debt' ? 'bg-gradient-to-br from-cyan-700 to-blue-600 dark:from-cyan-700 dark:to-blue-700' : 'bg-gradient-to-br from-red-400 to-red-200 dark:from-red-700 dark:to-amber-600'}`,
                  ])}
                  key={account.financial_accounts_id}
                >
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      {account.name}
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
                            <AlertDialogCancel type="button">
                              Cancelar
                            </AlertDialogCancel>
                            <AlertDialogAction
                              type="button"
                              onClick={async () =>
                                mutation.mutate(account.financial_accounts_id)
                              }
                            >
                              Continuar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{formattedValue(account.total || 0)}</p>
                  </CardContent>
                </Card>
              ),
            )
          ) : (
            <div>No hay cuenta financieras cargadas ...</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default AccountFinancial;
