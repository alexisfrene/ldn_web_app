import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { Icons } from "@common/Icons";
import { AddVariationImageForm } from "../forms";

interface Props {
  label: string;
  variationId: string;
  collectionId: string;
}

export const ModalAddVariationImage: React.FC<Props> = ({
  label,
  collectionId,
  variationId,
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Icons
          type="plus_circle"
          className="m-0.5 h-32 w-32 cursor-pointer rounded-md bg-emerald-400 p-3 text-emerald-100 hover:bg-emerald-500 hover:text-emerald-200"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Agregar una imagen a: ${label}`}</DialogTitle>
        </DialogHeader>
        <AddVariationImageForm
          collectionId={collectionId}
          variation_id={variationId}
        />
      </DialogContent>
    </Dialog>
  );
};
