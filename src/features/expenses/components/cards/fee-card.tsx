import React from "react";
import { cn, formattedValue } from "@utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { Label } from "@ui/label";

interface Props {
  installment_id: number;
  quota_number: number;
  amount: number;
  due_date: string;
  status: string;
}

const statusColors = {
  paid: "bg-rose-600/60 dark:bg-red-950",
  pending:
    "bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-500 cursor-pointer delay-75",
};

export const CardFee: React.FC<Props> = ({
  installment_id,
  quota_number,
  amount,
  due_date,
  status,
}) => {
  const cardStatus = status === "paid" ? "paid" : "pending";

  return (
    <Card key={installment_id} className={cn([statusColors[cardStatus]])}>
      <CardHeader>
        <CardTitle>Cuota número {quota_number + 1}</CardTitle>
        <CardDescription>
          {status === "paid" ? "Ya pagado" : "Sin Pagar"}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2">
        <Label>Monto:</Label>
        <p>{formattedValue(amount)}</p>
        <Label>Vencimiento:</Label>
        <p>
          {new Date(
            new Date(due_date).toLocaleString("en-US", {
              timeZone: "UTC",
            }),
          ).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
};
