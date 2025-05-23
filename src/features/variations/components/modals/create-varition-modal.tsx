import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { Icons } from "@components/common/icons";
import { CreateVariationForm } from "../forms";

export const CreateVariationModal: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Icons
          type="plus_circle"
          className="cursor-pointer rounded-md"
          height={50}
          width={50}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear una nueva variación</DialogTitle>
        </DialogHeader>
        <CreateVariationForm className="md:grid-cols-1" />
      </DialogContent>
    </Dialog>
  );
};
