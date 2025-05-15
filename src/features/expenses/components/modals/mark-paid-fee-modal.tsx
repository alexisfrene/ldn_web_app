import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { CardFee } from "@expenses-cards/fee-card";
import { MarkPaidFeeForm } from "@expenses-forms/mark-paid-fee-form";

interface Props {
  installment_id: number;
  quota_number: number;
  amount: number;
  due_date: string;
  status: string;
  debt_id: string;
  debt_name: string;
}

export const MarkPaidFeeModal: React.FC<Props> = ({
  installment_id,
  quota_number,
  amount,
  due_date,
  status,
  debt_id,
  debt_name,
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <CardFee
          amount={amount}
          due_date={due_date}
          installment_id={installment_id}
          quota_number={quota_number}
          status={status}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cuota número {quota_number + 1}</DialogTitle>
          <DialogDescription>
            Esta cuota se encenta con el estado de :
            <div className="text-lg font-semibold">
              {status === "paid" ? "Pagado" : "Sin pagar"}
            </div>
          </DialogDescription>
        </DialogHeader>
        <MarkPaidFeeForm
          installment_id={installment_id}
          amount={amount}
          due_date={due_date}
          status={status}
          debt_id={debt_id}
          debt_name={debt_name}
        />
      </DialogContent>
    </Dialog>
  );
};
