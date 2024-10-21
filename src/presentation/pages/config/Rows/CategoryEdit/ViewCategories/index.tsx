import React, { useState } from 'react';
import {
  deleteCollectionCategory,
  deleteValueCategory,
  modifyTitleCollectionCategory,
} from '@services';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
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
} from '@components';
import { FormAddCategory } from './FormAddCategory';
import { AlertDelete } from './AlertDelete';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  data: Category[];
  showSheet: (title: string, content: React.ReactElement) => void;
}

export const ViewCategories: React.FC<Props> = ({ data, showSheet }) => {
  const [selected, setSelected] = useState<string>();
  const [collectionTitle, setCollectionTitle] = useState<string>('');
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: modifyTitleCollectionCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return (
    <>
      <ScrollArea className="h-[70vh] px-2">
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
                  className="absolute right-0 top-0 mx-1 cursor-pointer text-slate-500 hover:text-slate-600"
                  onClick={() => setSelected('')}
                />
              ) : (
                <div className="absolute right-0 top-0 flex flex-row">
                  <Icons
                    type="copy_manual"
                    height={25}
                    className=" cursor-pointer rounded-tr-sm  text-slate-300 hover:text-slate-900"
                    onClick={() => {
                      setSelected(category_id);
                    }}
                  />
                  <AlertDelete
                    title={title}
                    id={category_id}
                    deleteFn={deleteCollectionCategory}
                    triggerIconType="trash"
                    triggerIconHeight={25}
                    triggerIconClass="cursor-pointer rounded-tr-sm text-slate-300 hover:text-red-600"
                    queryKey="categories"
                  />
                </div>
              )}
            </CardHeader>

            <CardContent className="flex flex-row flex-wrap gap-5">
              {values.map((e) => (
                <Badge key={e.id} variant="secondary" className="relative">
                  <Avatar>
                    <AvatarImage src={e.icon_url} alt="@ldn" />
                    <AvatarFallback>{e.value[0]}</AvatarFallback>
                  </Avatar>
                  {e.value}
                  {category_id === selected && (
                    <AlertDelete
                      title={e.value}
                      id={e.id}
                      deleteFn={deleteValueCategory}
                      triggerIconType="close"
                      triggerIconHeight={15}
                      triggerIconClass="absolute right-0 top-0 cursor-pointer rounded-tr-sm bg-red-500 hover:bg-red-400"
                      queryKey="categories"
                      isValue={true}
                      categoryId={category_id}
                    />
                  )}
                </Badge>
              ))}
              {category_id === selected && (
                <Badge
                  className="cursor-pointer bg-green-400 hover:bg-green-500"
                  onClick={() => {
                    return showSheet(
                      'Agregar una categoría nueva',
                      <FormAddCategory
                        type="value"
                        category_id={category_id}
                      />,
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
          return showSheet('Agregar una categoría nueva', <FormAddCategory />);
        }}
      >
        Agregar una categoría nueva
      </Button>
    </>
  );
};
