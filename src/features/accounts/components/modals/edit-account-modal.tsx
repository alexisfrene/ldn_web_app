import React from "react";
import { Icons } from "@common/Icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { EditAccountForm } from "./edit-account-form";

type Props = {
  name: string;
  financial_accounts_id: UUID;
  pays: number[];
};

export const EditFinancialAccountDialog: React.FC<Props> = ({
  name,
  financial_accounts_id,
  pays,
}) => (
  <Dialog>
    <DialogTrigger>
      <Icons
        type="copy_manual"
        className="absolute -top-2 right-2 h-4 cursor-pointer opacity-70 transition-opacity hover:scale-105 hover:opacity-100"
      />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar la cuenta financiera: {name}</DialogTitle>
        <DialogDescription>Esta acción es permanente</DialogDescription>
      </DialogHeader>
      <EditAccountForm
        name={name}
        financial_accounts_id={financial_accounts_id}
        pays={pays}
      />
    </DialogContent>
  </Dialog>
);
