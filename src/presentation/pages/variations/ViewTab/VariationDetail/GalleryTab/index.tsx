import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addImageCollection } from "@services";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icons,
  LoadingIndicator,
  TokenImage,
} from "@components";
import { AlertAddImage } from "./AlertAddImage";
import { AlertRemoveImage } from "./AlertRemoveImage";

interface Props {
  variation: Variants;
}

export const GalleryTab: React.FC<Props> = ({ variation }) => {
  const [edit, setEdit] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addImageCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["variation_details", variation.variation_id],
      });
    },
  });
  const handleSubmitAddImage = (
    data: { collectionId: string; image: File },
    setImage: (arg0: undefined) => void,
  ) => {
    mutation.mutate({
      variation_id: variation.variation_id,
      collection_id: data.collectionId,
      file: data.image,
    });
    setImage(undefined);
    setEdit("");
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{variation.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {variation.values.map((value) => (
          <div key={value.id} className="relative">
            <div className="absolute right-0">
              {edit === value.id ? (
                <Icons
                  type="close"
                  height={20}
                  className="cursor-pointer hover:text-slate-500"
                  onClick={() => setEdit("")}
                />
              ) : (
                <Icons
                  type="cog_6_tooth"
                  height={25}
                  className="cursor-pointer hover:text-slate-500"
                  onClick={() => setEdit(value.id)}
                />
              )}
            </div>
            <CardDescription>{value.label}</CardDescription>
            <div className="my-1 flex flex-row flex-wrap gap-6">
              {value.images.map((image, index) => (
                <AlertRemoveImage
                  label={value.label}
                  variationId={variation.variation_id}
                  collectionId={value.id}
                  edit={edit === value.id}
                  url={image}
                  key={value.label + index}
                >
                  <TokenImage
                    url={`${image}?width=200&height=200&quality=70&format=webp`}
                    variant="default"
                  />
                </AlertRemoveImage>
              ))}
              {edit === value.id && (
                <AlertAddImage
                  label={value.label}
                  variationId={variation.variation_id}
                  collectionId={value.id}
                  onClick={handleSubmitAddImage}
                />
              )}
            </div>
          </div>
        ))}
        <LoadingIndicator isLoading={mutation.isPending} />
      </CardContent>
    </Card>
  );
};
