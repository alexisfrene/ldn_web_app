import React from "react";
import { Movement } from "src/types/finance";
import { cn } from "@utils";
import { ScrollArea } from "@ui/scroll-area";
import { Skeleton } from "@ui/skeleton";
import { AnimatedPagination } from "@common/AnimatedPagination";
import { MovementCard } from "@movements-cards/movement-card";
import { useGetMovements } from "@movements-hooks/use-get-movements";

type Props = {
  expenseMovements?: {
    movements: Movement[];
    isLoading: boolean;
    totalPages: number;
    currentPage: number;
    isPlaceholderData: any;
  };
  height?: string;
};

export const MovementList: React.FC<Props> = ({ expenseMovements, height }) => {
  const [page, setPage] = React.useState(1);
  const fallback = useGetMovements(page);

  const { movements, isLoading, totalPages, currentPage, isPlaceholderData } =
    expenseMovements ?? fallback;

  return (
    <div className="border-none sm:min-h-96">
      <ScrollArea className={cn([height ?? "h-96", "mb-3"])}>
        {isLoading ? (
          <div>
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <React.Fragment key={index}>
                  <Skeleton className="my-2 h-[60px]" />
                </React.Fragment>
              ))}
          </div>
        ) : (
          <>
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
          </>
        )}
      </ScrollArea>
      {!isLoading ? (
        <AnimatedPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setPage={setPage}
          onClickPrevious={() => setPage((old) => Math.max(old - 1, 0))}
          onClickNext={() => {
            if (!isPlaceholderData && currentPage < totalPages) {
              setPage((old) => old + 1);
            }
          }}
        />
      ) : (
        <div className="mt-1 flex w-full items-center justify-center gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      )}
    </div>
  );
};
