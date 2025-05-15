import React from "react";
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
import { SelectSize } from "../selects/select-size";

export const ChoiceSizeModal: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-1">
          Selecciona una talle/numero
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecciona un talle / número </DialogTitle>
          <DialogDescription>
            Aquí puede seleccionar un talle o crear una nueva
          </DialogDescription>
        </DialogHeader>
        <SelectSize />
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
