import React from "react";
import { FormCreateAccount } from "@forms";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components";

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
