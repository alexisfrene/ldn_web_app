import { Button } from '@src/presentation/components';
import { useSessionStore } from '@src/presentation/global';
import React from 'react';
import { useNavigate } from 'react-router-dom';

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
