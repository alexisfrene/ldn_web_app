import React, { useState } from "react";
import { AddCategoryForm, CreateCollectionCategoryForm } from "@forms";
import {
  useChangeTitleCollectionCategory,
  useDeleteCollectionCategory,
  useDeleteValueCategory,
} from "@hooks";
import {
  AlertModal,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Icons,
  Input,
  Label,
  ScrollArea,
  TokenImage,
} from "@components";

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
      <ScrollArea>
        {data.map(({ values, title, category_id }) => (
          <Card key={category_id}>
            <CardHeader className="relative">
              {selected === category_id ? (
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
                </>
              ) : (
                <CardTitle className="my-5">{title}</CardTitle>
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
            </CardHeader>
            <CardContent className="flex flex-row flex-wrap gap-5">
              {values.map((e) => (
                <div
                  key={e.id}
                  className="relative flex flex-row gap-1 rounded-md bg-slate-200 px-2 py-2 dark:bg-slate-700"
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
                <Badge
                  className="cursor-pointer bg-green-400 hover:bg-green-500"
                  onClick={() => {
                    return showSheet(
                      "Agregar una categoría nueva",
                      <AddCategoryForm category_id={category_id} />,
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
