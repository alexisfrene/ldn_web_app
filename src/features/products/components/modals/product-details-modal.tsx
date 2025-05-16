import React, { PropsWithChildren } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { ProductDetailCard } from "../cards/product-detail-card";

export const ProductDetailsModal: React.FC<
  PropsWithChildren<{ product_id: string }>
> = ({ children, product_id }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="lg:min-w-3xl">
        <DialogHeader>
          <DialogTitle>Detalles del producto</DialogTitle>
          <DialogDescription>
            Aquí puedes ver los detalles del producto
          </DialogDescription>
        </DialogHeader>
        <ProductDetailCard product_id={product_id} />
      </DialogContent>
    </Dialog>
  );
};
