import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components';

import { CreateDebtForm } from '@forms';

export const CreateDebtModal: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-3">
          Crear nueva deuda
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-5xl">
        <DialogHeader>
          <DialogTitle>Crear nueva deuda :</DialogTitle>
          <DialogDescription>
            Aquí puede crear una nueva cuenta deuda.
          </DialogDescription>
        </DialogHeader>
        <CreateDebtForm />
      </DialogContent>
    </Dialog>
  );
};
