import React from "react";
import { Button } from "@ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { CreateExpenseForm } from "@expenses-forms/create-expense-form";

type Props = {
  buttonVariant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
};

export const CreateExpenseModal: React.FC<Props> = ({
  buttonVariant = "outline",
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} className="my-3">
          Crear etiqueta de gasto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear etiqueta de gasto</DialogTitle>
          <DialogDescription>
            Este formulario es la creación de una nueva categoría de gastos ,
            por ejemplos Gastos Varios , Gastos del Auto , etc...
          </DialogDescription>
        </DialogHeader>
        <CreateExpenseForm />
      </DialogContent>
    </Dialog>
  );
};
