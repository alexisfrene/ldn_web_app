import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFormikContext } from "formik";
import { getDebts } from "@services";
import { cn, formattedValue } from "@utils";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@ui/dialog";
import { Label } from "@ui/label";
import { ScrollArea } from "@ui/scroll-area";

export const SelectDebt: React.FC = () => {
  const { setFieldValue } = useFormikContext();
  const [selectedInstallmentId, setSelectedInstallmentId] = useState<
    number | null
  >(null);

  const { data, error } = useQuery({
    queryKey: ["debts"],
    queryFn: getDebts,
  });

  if (error) {
    return (
      <div>Error: {(error as Error).message || "An error has occurred"}</div>
    );
  }

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
        <Button type="button" variant="outline">
          Selecciona una deuda
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Elije una deuda:</DialogTitle>
          <DialogDescription>Deudas cargadas </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96">
          {data?.debts?.map(
            (debt: {
              name: string;
              debt_id: UUID;
              installments: {
                amount: number;
                installment_id: number;
                status: "unpaid" | "paid";
                due_date: string;
              }[];
            }) => (
              <div
                key={debt.debt_id}
                className={"mb-2 cursor-pointer rounded-md p-2"}
              >
                {debt.name}
                <div className="mt-3 flex gap-3">
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
