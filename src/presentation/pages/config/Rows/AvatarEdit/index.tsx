import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components';
import { EditAvatarModal } from '@presentation/components/modals';

export const AvatarEdit: React.FC = () => {
  return (
    <Card className="w-72 border-none">
      <CardHeader>
        <CardTitle>Editar avatar :</CardTitle>
        <CardDescription>
          Cambia tu imagen de perfil, esta imagen se mostrara en la app.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <EditAvatarModal />
      </CardContent>
    </Card>
  );
};
