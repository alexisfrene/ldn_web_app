import React from 'react';
import { MovementCard } from '@presentation/components/cards';
import { Card, Skeleton } from '@components';

interface Props {
  movements: {
    label: string;
    type: string;
    value: number;
    payment_method: string;
    account: string;
    id: string;
  }[];
  isPending: boolean;
}

export const MovementList: React.FC<Props> = ({ movements, isPending }) => {
  const skeletonItems = Array(8).fill(null);

  return (
    <div className="border-none sm:min-h-96">
      {isPending ? (
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
          {movements.length ? (
            movements &&
            movements.map(
              (movement: {
                label: string;
                type: string;
                value: number;
                payment_method: string;
                account: string;
                id: string;
              }) => (
                <MovementCard
                  accountName={movement.account}
                  label={movement.label}
                  amount={movement.value}
                  type={movement.type}
                  paymentMethod={movement.payment_method}
                  key={movement.id}
                  movementId={movement.id}
                />
              ),
            )
          ) : (
            <div className="m-3">No hay movimiento cargados ...</div>
          )}
        </>
      )}
    </div>
  );
};
