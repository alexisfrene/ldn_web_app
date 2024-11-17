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
  Icons,
} from '@components';
import { deleteDebt } from '@services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

interface Props {
  debt_id: UUID;
}

export const ModalDeleteDebt: React.FC<Props> = ({ debt_id }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteDebt,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['debts'],
      });
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Icons
          type="trash"
          height={23}
          width={23}
          className="cursor-pointer text-rose-600 hover:scale-105"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Esta acción es permanente estas seguro ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción también eliminara , los movimientos creados por pago de
            las cuotas y devolverá el dinero de donde salio.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutation.mutate(debt_id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
