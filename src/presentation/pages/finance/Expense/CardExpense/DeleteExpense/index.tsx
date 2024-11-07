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
  Icons,
} from '@components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteExpense } from '@services';

interface Props {
  expense_id: UUID;
}

export const DeleteExpense: React.FC<Props> = ({ expense_id }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['expenses'],
      });
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Icons
          type="trash"
          height={25}
          className="cursor-pointer text-red-700 hover:scale-105"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estas seguro de esta acción ?</AlertDialogTitle>
          <AlertDialogDescription>
            Estas por eliminar esta categoría de gasto , esta acción es
            permanente ...
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutation.mutate(expense_id)}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
