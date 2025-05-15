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

export const CreateAccountModal: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="my-3">
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
