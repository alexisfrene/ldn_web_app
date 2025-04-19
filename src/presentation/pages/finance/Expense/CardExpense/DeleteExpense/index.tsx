import React from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
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
        <AlertDialogFooter className="m-3 grid grid-cols-3 items-center justify-center gap-3 md:m-0 md:gap-1">
          <AlertDialogCancel className="col-start-2" asChild>
            <Button variant="secondary" type="button">
              Cancelar
            </Button>
          </AlertDialogCancel>
          <AlertDialogCancel
            onClick={() => mutation.mutate(expense_id)}
            asChild
          >
            <Button variant="default" type="submit">
              Continuar
            </Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
