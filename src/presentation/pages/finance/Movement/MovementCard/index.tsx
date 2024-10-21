import React from 'react';
import { cn, formattedValue } from '@lib';
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
  Badge,
  Icons,
} from '@components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMovement } from '@services';

interface Props {
  label: string;
  type: string;
  payment_method: string;
  account: string;
  value: number;
  id: string;
}

export const MovementCard: React.FC<Props> = ({
  label,
  type,
  payment_method,
  account,
  value,
  id,
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteMovement,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['movements'],
      });
    },
  });

  return (
    <div
      className={cn([
        'my-1 flex border-spacing-1 justify-between rounded-sm border-2 border-slate-300 p-3',
        `${type === 'inflow_of_money' ? 'bg-gradient-to-r from-emerald-100 to-emerald-300 dark:from-slate-800 dark:to-emerald-900' : 'bg-gradient-to-r from-red-100 to-red-300 dark:from-slate-800 dark:to-red-900'}`,
      ])}
    >
      <div className="flex">
        <Icons
          type="currency_dollar"
          className={cn([
            'h-10',
            `${type === 'inflow_of_money' ? 'text-green-500' : 'text-red-600'}`,
          ])}
          aria-label={`Tipo de movimiento: ${type}`}
        />
        <div>
          <p>{label}</p>
          <div className="flex gap-x-1">
            <Badge
              className={cn([
                `${type === 'inflow_of_money' ? 'bg-green-500 hover:bg-green-400' : 'bg-red-600 hover:bg-red-500'}`,
                'flex w-20 justify-center truncate',
              ])}
            >
              {`${type === 'inflow_of_money' ? 'Entrada' : 'Salida'}`}
            </Badge>
            <Badge
              className={cn([
                `${type === 'inflow_of_money' ? 'bg-green-500 hover:bg-green-400' : 'bg-red-600 hover:bg-red-500'}`,
                'flex w-20 justify-center truncate',
              ])}
            >
              {payment_method}
            </Badge>
            <Badge
              className={cn([
                `${type === 'inflow_of_money' ? 'bg-green-500 hover:bg-green-400' : 'bg-red-600 hover:bg-red-500'}`,
                'flex w-20 justify-center truncate',
              ])}
            >
              {account}
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex items-start">
        <p className="mx-3 my-3">{formattedValue(value)} </p>
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
                Estas seguro de eliminar este movimiento?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción es permanente
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                type="button"
                onClick={() => {
                  mutation.mutate(id);
                }}
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
