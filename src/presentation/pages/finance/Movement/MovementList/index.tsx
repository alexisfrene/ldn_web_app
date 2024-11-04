import { Card, Skeleton } from '@components';
import React from 'react';
import { MovementCard } from '../MovementCard';
import { useQuery } from '@tanstack/react-query';
import { getAllMovements } from '@services';

export const MovementList: React.FC = () => {
  const movements = useQuery({
    queryKey: ['movements'],
    queryFn: () => getAllMovements(),
  });
  if (movements.error) return 'An error has occurred: ';

  const skeletonItems = Array(8).fill(null);

  return (
    <Card className="min-h-96 border-none">
      {movements.isPending ? (
        <>
          {skeletonItems.map((_, index) => (
            <React.Fragment key={index}>
              <Skeleton className="h-[60px]" />
              <Skeleton className="my-1 h-[10px]" />
            </React.Fragment>
          ))}
        </>
      ) : (
        <>
          {movements.data.length ? (
            movements.data &&
            movements.data.map(
              (movement: {
                label: string;
                type: string;
                value: number;
                payment_method: string;
                account: string;
                id: string;
              }) => (
                <MovementCard
                  account={movement.account}
                  label={movement.label}
                  value={movement.value}
                  type={movement.type}
                  payment_method={movement.payment_method}
                  key={movement.id}
                  id={movement.id}
                />
              ),
            )
          ) : (
            <div className="m-3">No hay movimiento cargados ...</div>
          )}
        </>
      )}
    </Card>
  );
};
