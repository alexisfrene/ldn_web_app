import React from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStore } from "@global";
import { Button } from "@components";

interface Props {
  hideModal: () => void;
}

export const SignOff: React.FC<Props> = ({ hideModal }) => {
  const navigate = useNavigate();
  const insertSessionToken = useSessionStore(
    (state) => state.insertSessionToken,
  );
  const insertAvatar = useSessionStore((state) => state.insertAvatar);
  return (
    <div className="flex items-center justify-end gap-2">
      <Button variant="secondary" onClick={hideModal}>
        Cancelar
      </Button>
      <Button
        variant="destructive"
        onClick={() => {
          insertSessionToken("");
          insertAvatar("");
          navigate("/");
        }}
      >
        Cerrar sesión
      </Button>
    </div>
  );
};
