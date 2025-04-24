import React from 'react';
import { MovementCard } from '@presentation/components/cards';
import { Skeleton } from '@components';

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
  return (
    <div className="border-none sm:min-h-96">
      {isPending ? (
        <div className="grid grid-cols-1 gap-3">
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <React.Fragment key={index}>
                <Skeleton className="h-[60px]" />
                <Skeleton className="my-1 h-[10px]" />
              </React.Fragment>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {movements.length ? (
            movements.map((movement) => (
              <MovementCard
                accountName={movement.account}
                label={movement.label}
                amount={movement.value}
                type={movement.type}
                paymentMethod={movement.payment_method}
                key={movement.id}
                movementId={movement.id}
              />
            ))
          ) : (
            <p className="m-3">No hay movimientos cargados</p>
          )}
        </div>
      )}
    </div>
  );
};
