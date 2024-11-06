import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
  MovementList,
  ScrollArea,
  Skeleton,
} from '@components';
import { getExpenseById } from '@services';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

interface Props {
  children: React.ReactNode;
  name: string;
  expense_id: UUID;
}

export const ExpenseDetail: React.FC<Props> = ({
  children,
  name,
  expense_id,
}) => {
  const expenses = useQuery({
    queryKey: ['expenses', expense_id],
    queryFn: () => getExpenseById({ expense_id }),
  });

  if (expenses.isPending) {
    return <Skeleton className="h-[65vh] w-[85vw]" />;
  }
  if (expenses.error) return 'An error has occurred: ';
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Detalles sobre la categoría de gastos llamada :{name}
          </DialogTitle>
          <DialogDescription>
            En este apartado podrá ver , todos los movimientos que se ejecutaron
            en el mismo :
          </DialogDescription>
        </DialogHeader>
        <Label>Nombre : {expenses.data.name}</Label>
        <Label>Descripción : {expenses.data.description}</Label>
        <ScrollArea className="h-96 px-3">
          <MovementList
            isPending={expenses.isPending}
            movements={expenses.data.movements}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
