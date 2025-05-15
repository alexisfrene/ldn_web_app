import React, { useState } from "react";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { ScrollArea } from "@ui/scroll-area";
import { AlertModal } from "@common/alert-modal";
import { Icons } from "@common/icons";
import { AddSizeForm } from "@sizes-forms/add-size-form";
import { CreateCollectionSizeForm } from "@sizes-forms/create-collection-size-form";
import { useDeleteCollectionSize } from "@sizes-hooks/use-delete-collection-size";
import { useChangeDeleteValueSize } from "@sizes-hooks/use-delete-value-size";
import { useChangeTitleCollectionSize } from "@sizes-hooks/use-edit-title-collection-size";

interface Props {
  data: Size[];
  showSheet: (title: string, content: React.ReactElement) => void;
}

export const ViewSizes: React.FC<Props> = ({ data, showSheet }) => {
  const [selected, setSelected] = useState<string>();
  const [collectionTitle, setCollectionTitle] = useState<string>("");
  const mutation = useChangeTitleCollectionSize();
  const mutationDeleteCollection = useDeleteCollectionSize();
  const mutationDeleteValue = useChangeDeleteValueSize();
  return (
    <>
      <ScrollArea>
        {data.map(({ values, title, size_id }) => (
          <Card key={size_id}>
            <CardHeader className="relative">
              {selected === size_id ? (
                <>
                  <Label className="w-full">Nombre de la colección </Label>
                  <div className="flex">
                    <Input
                      placeholder={title}
                      onChange={(e) => setCollectionTitle(e.target.value)}
                    />
                    <Button
                      className="cursor-pointer rounded-md bg-green-400 hover:bg-green-500"
                      disabled={
                        title === collectionTitle ||
                        collectionTitle.length === 0
                      }
                      onClick={() => {
                        mutation.mutate({ title: collectionTitle, size_id });
                      }}
                    >
                      <Icons type="check" className="h-8" />
                    </Button>
                  </div>
                </>
              ) : (
                <CardTitle className="my-5">{title}</CardTitle>
              )}
              {selected === size_id ? (
                <Icons
                  type="close"
                  height={20}
                  className="absolute top-0 right-0 mx-1 cursor-pointer text-slate-500 hover:text-slate-600"
                  onClick={() => setSelected("")}
                />
              ) : (
                <div className="absolute top-0 right-0 flex flex-row">
                  <Icons
                    type="copy_manual"
                    height={25}
                    className="cursor-pointer rounded-tr-sm text-slate-300 hover:text-slate-900"
                    onClick={() => {
                      setSelected(size_id);
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
                    onConfirm={() => mutationDeleteCollection.mutate(size_id)}
                  />
                </div>
              )}
            </CardHeader>
            <CardContent className="flex flex-row flex-wrap gap-5">
              {values.map((e) => (
                <div
                  key={e.id}
                  className="relative flex flex-row gap-1 rounded-md bg-slate-200 px-2 py-2 dark:bg-slate-700"
                >
                  {e.value}
                  {size_id === selected && (
                    <AlertModal
                      trigger={
                        <Icons
                          type="close"
                          height={13}
                          className="absolute top-0 right-0 cursor-pointer rounded-tr-sm bg-red-500 hover:bg-red-400"
                        />
                      }
                      title="Estas por eliminar una colección de categorías"
                      description="Esta acción no se puede deshacer. ¿Estás seguro de que deseas continuar?"
                      onConfirm={() =>
                        mutationDeleteValue.mutate({
                          size_id: size_id,
                          size_value: e.id,
                        })
                      }
                    />
                  )}
                </div>
              ))}
              {size_id === selected && (
                <Badge
                  className="cursor-pointer bg-green-400 hover:bg-green-500"
                  onClick={() => {
                    return showSheet(
                      "Agregar un numero / talla nueva",
                      <AddSizeForm size_id={size_id} />,
                    );
                  }}
                >
                  <Icons type="plus_circle" height={35} />
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
      <Button
        variant="default"
        onClick={() => {
          return showSheet(
            "Agregar un numero / talla nueva",
            <CreateCollectionSizeForm />,
          );
        }}
      >
        Agregar un numero / talla nueva
      </Button>
    </>
  );
};
