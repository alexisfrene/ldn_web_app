import React from 'react';
import { MovementCard } from '@cards';
import {
  Skeleton,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  ScrollArea,
} from '@components';
import { useGetMovements } from '@hooks';
import { Movement } from 'src/types/finance';

type Props = {
  expenseMovements?: {
    movements: Movement[];
    isLoading: boolean;
    totalPages: number;
    currentPage: number;
  };
};

export const MovementList: React.FC<Props> = ({ expenseMovements }) => {
  const [page, setPage] = React.useState(1);

  const { movements, isLoading, totalPages, currentPage } =
    expenseMovements ?? useGetMovements(page);

  return (
    <div className="border-none sm:min-h-96">
      {isLoading ? (
        <div>
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
        <ScrollArea className="mb-3 h-96">
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
        </ScrollArea>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (totalPages === 1) return;
                setPage(currentPage - 1);
              }}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => setPage(index + 1)}
                isActive={index + 1 === currentPage}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (totalPages === currentPage) return;
                setPage(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
