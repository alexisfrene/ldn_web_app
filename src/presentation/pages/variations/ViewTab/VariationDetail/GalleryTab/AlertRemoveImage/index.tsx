import React, { ReactNode } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeImageCollection } from "@services";
import { Icons } from "@common/Icons";
import { ImageLoader } from "@common/ImageLoader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ui/alert-dialog";

interface Props {
  label: string;
  variationId: string;
  collectionId: string;
  children: ReactNode;
  edit: boolean;
  url: string;
}

export const AlertRemoveImage: React.FC<Props> = ({
  label,
  variationId,
  collectionId,
  children,
  edit,
  url,
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: removeImageCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["variation_details", variationId],
      });
    },
  });

  return (
    <AlertDialog>
      {children}
      {edit && (
        <AlertDialogTrigger className="relative">
          <Icons
            type="close"
            height={20}
            className="absolute right-0 top-0 m-0.5 cursor-pointer rounded-md bg-red-600 text-slate-50 hover:bg-red-500 hover:text-slate-100"
          />
        </AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {`Eliminar esta imagen de : ${label}`}
          </AlertDialogTitle>
        </AlertDialogHeader>
        {url && (
          <div className="flex justify-center bg-slate-200 dark:bg-slate-700">
            <ImageLoader
              alt="Image"
              url={url}
              className="m-0.5 rounded-md"
              height={60}
              width={60}
            />
          </div>
        )}
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={async () =>
              mutation.mutate({
                variation_id: variationId,
                collection_id: collectionId,
                url,
              })
            }
          >
            Ok
          </AlertDialogAction>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
