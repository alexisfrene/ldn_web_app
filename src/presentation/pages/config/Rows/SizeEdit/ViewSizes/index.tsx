import React, { useState } from 'react';
import {
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
import {
  deleteCollectionSize,
  deleteValueSize,
  modifyTitleCollectionSize,
} from '@services';
import { FormAddSize } from './FormAddSize';
import { AlertDelete } from './AlertDelete';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  data: Size[];
  showSheet: (title: string, content: React.ReactElement) => void;
}

export const ViewSizes: React.FC<Props> = ({ data, showSheet }) => {
  const [selected, setSelected] = useState<string>();
  const [collectionTitle, setCollectionTitle] = useState<string>('');
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: modifyTitleCollectionSize,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sizes'] });
    },
  });

  return (
    <>
      <ScrollArea className="h-[70vh] px-2">
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
                      setSelected(size_id);
                    }}
                  />
                  <AlertDelete
                    title={title}
                    id={size_id}
                    deleteFn={deleteCollectionSize}
                    triggerIconType="trash"
                    triggerIconHeight={25}
                    triggerIconClass="cursor-pointer rounded-tr-sm text-slate-300 hover:text-red-600"
                    queryKey="sizes"
                  />
                </div>
              )}
            </CardHeader>
            <CardContent className="flex flex-row flex-wrap gap-5">
              {values.map((e) => (
                <Badge key={e.id} variant="secondary" className="relative">
                  {e.value}
                  {size_id === selected && (
                    <AlertDelete
                      title={title}
                      id={e.id}
                      deleteFn={deleteValueSize}
                      triggerIconType="close"
                      triggerIconHeight={13}
                      triggerIconClass="absolute right-0 top-0 cursor-pointer rounded-tr-sm bg-red-500 hover:bg-red-400"
                      queryKey="sizes"
                      isValue={true}
                      sizeId={size_id}
                    />
                  )}
                </Badge>
              ))}
              {size_id === selected && (
                <Badge
                  className="cursor-pointer bg-green-400 hover:bg-green-500"
                  onClick={() => {
                    return showSheet(
                      'Agregar un numero / talla nueva',
                      <FormAddSize type="value" size_id={size_id} />,
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
          return showSheet('Agregar un numero / talla nueva', <FormAddSize />);
        }}
      >
        Agregar un numero / talla nueva
      </Button>
    </>
  );
};
