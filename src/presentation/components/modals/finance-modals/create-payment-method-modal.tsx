import React from "react";
import { FormCreatePaymentMethod } from "@forms";
import { Dialog, DialogContent, DialogTrigger, Icons } from "@components";

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
