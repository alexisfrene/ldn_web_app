import React from 'react';
import { Dialog, DialogContent, DialogTrigger, Icons } from '@components';
import { FormCreatePaymentMethod } from '@forms';

export const CreatePaymentMethodModal: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Icons
          type="plus_circle"
          height={25}
          className="cursor-pointer hover:scale-105"
        />
      </DialogTrigger>
      <DialogContent className="w-fit">
        <FormCreatePaymentMethod />
      </DialogContent>
    </Dialog>
  );
};
