import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Icons,
} from '@components';
import { CreateBrandForm } from '@forms';
export const CreateBrandModal: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex w-full items-center justify-between"
          type="button"
          variant="outline"
        >
          <span>Crear</span>
          <Icons type="cog_6_tooth" height={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Marca</DialogTitle>
          <DialogDescription>
            Aquí puede crear una nueva marca
          </DialogDescription>
        </DialogHeader>
        <CreateBrandForm />
      </DialogContent>
    </Dialog>
  );
};
