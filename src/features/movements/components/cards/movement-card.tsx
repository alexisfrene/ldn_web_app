import React from "react";
import { cn, formattedValue } from "@utils";
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
} from "@ui/alert-dialog";
import { Badge } from "@ui/badge";
import { Icons } from "@components/common/icons";
import { useDeleteMovement } from "@movements-hooks/use-delete-movement";

interface MovementCardProps {
  label: string;
  type: string;
  paymentMethod: string;
  accountName: string;
  amount: number;
  movementId: string;
}

export const MovementCard: React.FC<MovementCardProps> = ({
  label,
  type,
  paymentMethod,
  accountName,
  amount,
  movementId,
}) => {
  const mutation = useDeleteMovement();

  const isMoneyInflow = type === "inflow_of_money";

  const containerClasses = cn([
    "flex my-1 border-spacing-1 justify-between rounded-sm border-2 border-slate-300 sm:p-3 bg-linear-to-r",
    isMoneyInflow
      ? "from-emerald-100 to-emerald-300 dark:from-slate-800 dark:to-emerald-900"
      : "from-red-100 to-red-300 dark:from-slate-800 dark:to-red-900",
  ]);

  const badgeClasses = cn([
    isMoneyInflow
      ? "bg-green-500 hover:bg-green-400"
      : "bg-red-600 hover:bg-red-500",
    "flex justify-center truncate",
  ]);

  return (
    <div className={containerClasses}>
      <div className="flex items-center">
        <Icons
          type="currency_dollar"
          className={cn([
            "h-10",
            isMoneyInflow ? "text-green-500" : "text-red-600",
          ])}
          aria-label={`Tipo de movimiento: ${type}`}
        />
        <div>
          <p className="hidden sm:block">{label}</p>
          <div className="hidden gap-x-1 sm:flex">
            <Badge className={badgeClasses}>
              {isMoneyInflow ? "Entrada" : "Salida"}
            </Badge>
            <Badge className={badgeClasses}>{paymentMethod}</Badge>
            <Badge className={badgeClasses}>{accountName}</Badge>
          </div>
        </div>
      </div>
      <div className="flex items-start">
        <p className="mx-3 my-3">{formattedValue(amount)} </p>
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
                ¿Estás seguro de eliminar este movimiento?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción es permanente
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                type="button"
                onClick={() => mutation.mutate(movementId)}
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
