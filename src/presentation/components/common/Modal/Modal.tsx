import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components";

export interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  children,
  className,
  title,
  description,
}) => {
  return (
    <Dialog
      open={isOpen}
      defaultOpen={false}
      onOpenChange={() => onRequestClose()}
    >
      <DialogContent className={className}>
        <DialogHeader className="px-3">
          <DialogTitle>{title || ""}</DialogTitle>
          <DialogDescription>{description || ""}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
