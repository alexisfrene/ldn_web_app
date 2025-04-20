import React from 'react';
import { UpdateAvatarForm } from '@forms';
import { useSessionStore } from '@global';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icons,
  TokenImage,
} from '@components';

export const AvatarEdit: React.FC = () => {
  const avatar = useSessionStore((state) => state.avatar);

  return (
    <Card className="w-72 border-none">
      <CardHeader>
        <CardTitle>Editar avatar :</CardTitle>
        <CardDescription>
          Cambia tu imagen de perfil, esta imagen se mostrara en la app.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="relative">
              <Icons
                type="copy_manual"
                height={30}
                className="absolute right-0 bg-slate-200 dark:bg-slate-800"
              />
              <TokenImage
                url={`${avatar}?width=150&height=150&quality=50&format=webp`}
                variant="default"
                skeletonWidth={150}
                skeletonHeight={150}
                className="rounded-3xl"
              />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Sube una imagen :</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción es permanente y la imagen anterior sera eliminada.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <UpdateAvatarForm />
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};
