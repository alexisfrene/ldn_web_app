import React, { useState } from "react";
import { useFormikContext } from "formik";
import { cn, formattedValue } from "@utils";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { Label } from "@ui/label";
import { ScrollArea } from "@ui/scroll-area";
import { useGetDebts } from "@debts-hooks/use-get-debts";

type Props = {
  buttonVariant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
};

export const SelectDebt: React.FC<Props> = ({ buttonVariant = "outline" }) => {
  const { setFieldValue } = useFormikContext();
  const [selectedInstallmentId, setSelectedInstallmentId] = useState<
    number | null
  >(null);

  const { debts } = useGetDebts();

  const handleSelectDebt = ({
    debt_id,
    installment_id,
    amount,
  }: {
    debt_id: UUID;
    installment_id: number;
    amount: number;
  }) => {
    setFieldValue("debt_id", debt_id);
    setFieldValue("installment_id", installment_id);
    setFieldValue("value", amount);
    setSelectedInstallmentId(installment_id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant={buttonVariant}>
          Selecciona una deuda
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Elije una deuda:</DialogTitle>
          <DialogDescription>Deudas cargadas </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96">
          {debts?.map(
            (debt: {
              debt_id: UUID;
              installments: {
                status: string;
                installment_id: number;
                amount: number;
                due_date: string;
              }[];
              name: string;
            }) => (
              <div
                key={debt.debt_id}
                className="mb-2 cursor-pointer rounded-md p-2"
              >
                {debt.name}
                <div className="mt-3 flex flex-wrap gap-3">
                  {debt.installments.map((installment) => (
                    <div>
                      {installment.status === "paid" ? (
                        <div className="flex h-20 cursor-no-drop flex-col items-center justify-center gap-3 rounded-md bg-slate-500 px-3 dark:bg-slate-900">
                          <Label className="text-slate-600">
                            {new Date(
                              installment.due_date,
                            ).toLocaleDateString()}
                          </Label>
                          <Badge
                            className={
                              "bg-slate-700 p-1 text-lg hover:bg-slate-800"
                            }
                          >
                            {formattedValue(installment.amount)}
                          </Badge>
                        </div>
                      ) : (
                        <div className="flex h-20 flex-col items-center justify-center gap-3 rounded-md bg-slate-200 px-3 dark:bg-slate-700">
                          <Label>
                            {new Date(
                              installment.due_date,
                            ).toLocaleDateString()}
                          </Label>
                          <Badge
                            className={cn([
                              "bg-slate-300 p-1 text-lg",
                              selectedInstallmentId ===
                                installment.installment_id &&
                                "bg-blue-300 dark:bg-slate-400",
                            ])}
                            onClick={() =>
                              handleSelectDebt({
                                debt_id: debt.debt_id,
                                installment_id: installment.installment_id,
                                amount: installment.amount,
                              })
                            }
                          >
                            {formattedValue(installment.amount)}
                          </Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ),
          )}
        </ScrollArea>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
