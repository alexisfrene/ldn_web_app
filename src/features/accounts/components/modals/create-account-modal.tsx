import React from "react";
import { Button } from "@ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { FormCreateAccount } from "../forms/create-account-form";

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

export const CreateAccountModal: React.FC<Props> = ({
  buttonVariant = "outline",
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} className="my-3">
          Crear nueva cuenta
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear nueva cuenta financiera :</DialogTitle>
          <DialogDescription>
            Aquí puede crear una nueva cuenta financiera.
          </DialogDescription>
        </DialogHeader>
        <FormCreateAccount />
      </DialogContent>
    </Dialog>
  );
};
