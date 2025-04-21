import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components';
import { useSessionStore } from '@global';

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
    <div className="flex justify-evenly">
      <Button variant="secondary" onClick={hideModal}>
        Cancelar
      </Button>
      <Button
        variant="destructive"
        onClick={() => {
          insertSessionToken('');
          insertAvatar('');
          navigate('/');
        }}
      >
        Cerrar sesión
      </Button>
    </div>
  );
};
