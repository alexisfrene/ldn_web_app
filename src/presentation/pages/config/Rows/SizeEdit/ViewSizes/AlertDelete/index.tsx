import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Icons,
  type IconsType,
} from '@components';

interface AlertDeleteProps {
  title: string;
  id: string;
  deleteFn: (value: any) => Promise<any>;
  triggerIconType: IconsType;
  triggerIconHeight: number;
  triggerIconClass: string;
  queryKey: string;
  isValue?: boolean;
  sizeId?: string;
}

export const AlertDelete: React.FC<AlertDeleteProps> = ({
  title,
  id,
  deleteFn,
  triggerIconType,
  triggerIconHeight,
  triggerIconClass,
  queryKey,
  isValue = false,
  sizeId,
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  const handleDelete = () => {
    if (isValue && sizeId) {
      mutation.mutate({ size_value: id, size_id: sizeId });
    } else {
      mutation.mutate(id);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Icons
          type={triggerIconType}
          height={triggerIconHeight}
          className={triggerIconClass}
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {`Estas seguro de eliminar ${title.toUpperCase()}?`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción es permanente, se perderán los datos y las imágenes
            asociadas a la misma!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
