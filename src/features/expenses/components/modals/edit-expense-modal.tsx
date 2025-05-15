import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { Icons } from "@common/icons";
import { EditExpenseForm } from "../forms/edit-expense-form";

interface Props {
  name: string;
  description: string;
  expense_id: UUID;
}

export const EditExpenseModal: React.FC<Props> = ({
  name,
  description,
  expense_id,
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Icons
          type="copy_manual"
          height={25}
          className="cursor-pointer hover:scale-105"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar los valores de : {name}</DialogTitle>
          <DialogDescription>
            Esta acción es permanente , y puede modificar todos los movimientos
            que usan este tipo de gasto
          </DialogDescription>
        </DialogHeader>
        <EditExpenseForm
          name={name}
          description={description}
          expense_id={expense_id}
        />
      </DialogContent>
    </Dialog>
  );
};
