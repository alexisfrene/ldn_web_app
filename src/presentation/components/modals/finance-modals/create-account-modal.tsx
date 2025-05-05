import React from 'react';
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@components';
import { FormCreateAccount } from '@forms';
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
