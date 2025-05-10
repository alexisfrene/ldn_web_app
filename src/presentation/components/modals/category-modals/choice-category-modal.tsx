import React from "react";
import { SelectCategory } from "@selects";
import { Button } from "@ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";

export const ChoiceCategoryModal: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-3">
          Selecciona una categoría
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecciona una categoría</DialogTitle>
          <DialogDescription>
            Aquí puede seleccionar una categoría o crear una nueva
          </DialogDescription>
        </DialogHeader>
        <SelectCategory />
        <DialogFooter>
          <DialogClose>
            <Button variant="secondary" className="w-full">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose>
            <Button className="w-full">Seleccionar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
