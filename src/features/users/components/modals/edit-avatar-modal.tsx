import React from "react";
import { useSessionStore } from "src/global";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ui/alert-dialog";
import { Icons } from "@common/icons";
import { TokenImage } from "@common/image-private";
import { UpdateAvatarForm } from "@users-forms/update-avatar-form";

export const EditAvatarModal: React.FC = () => {
  const avatar = useSessionStore((state) => state.avatar);
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="relative min-w-20 min-h-32">
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
  );
};
