import React from "react";
import { FormCreatePaymentMethod } from "@forms";
import { Dialog, DialogContent, DialogTrigger } from "@ui/dialog";
import { Icons } from "@common/Icons";

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
