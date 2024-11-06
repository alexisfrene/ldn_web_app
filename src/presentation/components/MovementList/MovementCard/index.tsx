import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cn, formattedValue } from '@utils';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  Badge,
  Icons,
} from '@components';
import { deleteMovement } from '@services';

interface MovementCardProps {
  label: string;
  type: string;
  paymentMethod: string;
  accountName: string;
  amount: number;
  movementId: string;
}

export const MovementCard: React.FC<MovementCardProps> = ({
  label,
  type,
  paymentMethod,
  accountName,
  amount,
  movementId,
}) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteMovement,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['movements'] }),
  });

  const isMoneyInflow = type === 'inflow_of_money';

  const containerClasses = cn([
    'my-1 flex border-spacing-1 justify-between rounded-sm border-2 border-slate-300 p-3',
    isMoneyInflow
      ? 'bg-gradient-to-r from-emerald-100 to-emerald-300 dark:from-slate-800 dark:to-emerald-900'
      : 'bg-gradient-to-r from-red-100 to-red-300 dark:from-slate-800 dark:to-red-900',
  ]);

  const badgeClasses = cn([
    isMoneyInflow
      ? 'bg-green-500 hover:bg-green-400'
      : 'bg-red-600 hover:bg-red-500',
    'flex w-20 justify-center truncate',
  ]);

  return (
    <div className={containerClasses}>
      <div className="flex">
        <Icons
          type="currency_dollar"
          className={cn([
            'h-10',
            isMoneyInflow ? 'text-green-500' : 'text-red-600',
          ])}
          aria-label={`Tipo de movimiento: ${type}`}
        />
        <div>
          <p>{label}</p>
          <div className="flex gap-x-1">
            <Badge className={badgeClasses}>
              {isMoneyInflow ? 'Entrada' : 'Salida'}
            </Badge>
            <Badge className={badgeClasses}>{paymentMethod}</Badge>
            <Badge className={badgeClasses}>{accountName}</Badge>
          </div>
        </div>
      </div>
      <div className="flex items-start">
        <p className="mx-3 my-3">{formattedValue(amount)} </p>
        <AlertDialog>
          <AlertDialogTrigger>
            <Icons
              type="close"
              className="h-4 cursor-pointer hover:scale-105"
            />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                ¿Estás seguro de eliminar este movimiento?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción es permanente
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                type="button"
                onClick={() => deleteMutation.mutate(movementId)}
              >
                Borrar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
