import React, { useState } from "react";
import { Icons } from "@common/Icons";
import { ImageLoader } from "@common/ImageLoader";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { Input } from "@ui/input";

interface Props {
  label: string;
  variationId: string;
  collectionId: string;
  onClick: (
    data: { collectionId: string; image: File },
    setImage: (arg0: undefined) => void,
  ) => void;
}

export const ModalAddVariationImage: React.FC<Props> = ({
  label,
  collectionId,
  onClick,
}) => {
  const [image, setImage] = useState<{ file: File; url: string }>();

  return (
    <Dialog>
      <DialogTrigger>
        <Icons
          type="plus_circle"
          className="m-0.5 h-32 w-32 cursor-pointer rounded-md bg-emerald-400 p-3 text-emerald-100 hover:bg-emerald-500 hover:text-emerald-200"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Agregar una imagen a: ${label}`}</DialogTitle>
        </DialogHeader>

        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const url = URL.createObjectURL(file);
              setImage({ file, url });
            }
          }}
        />

        <div className="flex justify-center bg-slate-200 dark:bg-slate-700">
          {image && (
            <ImageLoader
              alt="Image"
              url={image.url}
              className="m-0.5 rounded-md"
              height={60}
              width={60}
            />
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button
              className="btn btn-primary disabled:opacity-50"
              onClick={() => {
                if (!image?.file) return;
                onClick({ collectionId, image: image.file }, setImage);
              }}
              disabled={!image?.file}
            >
              Ok
            </button>
          </DialogClose>
          <DialogClose asChild>
            <button
              className="btn btn-secondary"
              onClick={() => setImage(undefined)}
            >
              Cancelar
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
