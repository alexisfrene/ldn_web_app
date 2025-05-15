import React, { useState } from "react";
import {
  AddCategoryForm,
  CreateCollectionCategoryForm,
} from "@features/categories/components/forms";
import {
  useChangeTitleCollectionCategory,
  useDeleteCollectionCategory,
  useDeleteValueCategory,
} from "@features/categories/hooks";
import { AlertModal } from "@common/AlertModal";
import { Icons } from "@common/Icons";
import { TokenImage } from "@common/ImagePrivate";
import { Avatar, AvatarFallback } from "@ui/avatar";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { ScrollArea } from "@ui/scroll-area";

interface Props {
  data: Category[];
  showSheet: (title: string, content: React.ReactElement) => void;
}

export const ViewCategories: React.FC<Props> = ({ data, showSheet }) => {
  const [selected, setSelected] = useState<number>();
  const [collectionTitle, setCollectionTitle] = useState<string>("");
  const mutation = useChangeTitleCollectionCategory();
  const mutationDeleteCollection = useDeleteCollectionCategory();
  const mutationDeleteValue = useDeleteValueCategory();

  return (
    <>
      <ScrollArea className="h-96 mb-3">
        {data.map(({ values, title, category_id }) => (
          <div key={category_id}>
            <div className="relative">
              {selected === category_id ? (
                <div className="mt-8">
                  <Label className="w-full">Nombre de la colección </Label>
                  <div className="flex gap-1">
                    <Input
                      placeholder={title}
                      onChange={(e) => setCollectionTitle(e.target.value)}
                      className="my-3"
                    />
                    <Button
                      className="cursor-pointer rounded-md bg-green-400 hover:bg-green-500 my-3"
                      disabled={
                        title === collectionTitle ||
                        collectionTitle.length === 0
                      }
                      onClick={async () => {
                        mutation.mutate({
                          title: collectionTitle,
                          category_id,
                        });
                      }}
                    >
                      <Icons type="check" className="h-8" />
                    </Button>
                  </div>
                </div>
              ) : (
                <Label className="mt-8 mb-2">{title}</Label>
              )}
              {selected === category_id ? (
                <Icons
                  type="close"
                  height={20}
                  className="absolute top-0 right-0 mx-1 cursor-pointer text-slate-500 hover:text-slate-600"
                  onClick={() => setSelected(undefined)}
                />
              ) : (
                <div className="absolute top-0 right-0 flex flex-row">
                  <Icons
                    type="copy_manual"
                    height={25}
                    className="cursor-pointer rounded-tr-sm text-slate-300 hover:text-slate-900"
                    onClick={() => {
                      setSelected(category_id);
                    }}
                  />
                  <AlertModal
                    trigger={
                      <Icons
                        type="trash"
                        height={25}
                        className="cursor-pointer rounded-tr-sm text-slate-300 hover:text-red-600"
                      />
                    }
                    title="Estas por eliminar una colección de categorías"
                    description="Esta acción no se puede deshacer. ¿Estás seguro de que deseas continuar?"
                    onConfirm={() =>
                      mutationDeleteCollection.mutate(category_id)
                    }
                  />
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {values.map((e) => (
                <div
                  key={e.id}
                  className="relative flex  gap-1 rounded-md bg-slate-200 px-1 py-2 dark:bg-slate-700"
                >
                  <Avatar>
                    <TokenImage
                      url={`${e.icon_url}?width=60&height=60&quality=50&format=webp`}
                      variant="avatar"
                    />
                    <AvatarFallback>{e.value[0]}</AvatarFallback>
                  </Avatar>
                  {e.value}
                  {category_id === selected && (
                    <AlertModal
                      trigger={
                        <Icons
                          type="close"
                          height={15}
                          className="absolute top-0 right-0 cursor-pointer rounded-tr-sm bg-red-500 hover:bg-red-400"
                        />
                      }
                      title="Estas por eliminar una categoría"
                      description="Esta acción no se puede deshacer. ¿Estás seguro de que deseas continuar?"
                      onConfirm={() =>
                        mutationDeleteValue.mutate({
                          category_id,
                          category_value: e.id,
                        })
                      }
                    />
                  )}
                </div>
              ))}
              {category_id === selected && (
                <div
                  className="cursor-pointer bg-green-400 hover:bg-green-500 flex justify-center items-center rounded-sm"
                  onClick={() => {
                    return showSheet(
                      "Agregar una categoría nueva",
                      <AddCategoryForm category_id={category_id} />,
                    );
                  }}
                >
                  <Icons type="plus_circle" height={35} />
                </div>
              )}
            </div>
          </div>
        ))}
      </ScrollArea>
      <Button
        variant="default"
        onClick={() => {
          return showSheet(
            "Agregar una categoría nueva",
            <CreateCollectionCategoryForm />,
          );
        }}
      >
        Agregar una categoría nueva
      </Button>
    </>
  );
};
