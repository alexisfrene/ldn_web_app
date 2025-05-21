import React from "react";
import { AlertModal } from "@common/alert-modal";
import { Icons } from "@components/common/icons";
import { useDeleteMovement } from "@movements-hooks/use-delete-movement";

type Props = {
  movementId: string;
};
export const DeleteMovementModal: React.FC<Props> = ({ movementId }) => {
  const mutation = useDeleteMovement();
  return (
    <AlertModal
      trigger={
        <Icons type="close" className="h-4 cursor-pointer hover:scale-105" />
      }
      title="¿Estás seguro de eliminar este movimiento?"
      description="Esta acción es permanente"
      cancelText="Cancelar"
      confirmText="Borrar"
      onConfirm={() => mutation.mutate(movementId)}
    />
  );
};
