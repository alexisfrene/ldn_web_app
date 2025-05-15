import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { Icons } from "@common/icons";
import { EditProductImageForm } from "@products-forms/edit-product-image-form";

type Props = {
  product_id: string;
};
export const EditProductImageModal: React.FC<Props> = ({ product_id }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Icons
          type="copy_manual"
          className=" top-0 left-0 m-2 h-7 cursor-pointer rounded-sm bg-white p-1 hover:text-slate-700 sm:h-10 dark:bg-slate-700 dark:hover:bg-slate-900 dark:hover:text-slate-50"
        />
      </DialogTrigger>
      <DialogContent className="min-w-3xl">
        <DialogHeader>
          <DialogTitle>Cambiar la imagen principal</DialogTitle>
          <DialogDescription>
            Esta acción es permanente y la imagen antigua se perderá.
          </DialogDescription>
        </DialogHeader>
        <EditProductImageForm product_id={product_id} />
      </DialogContent>
    </Dialog>
  );
};
