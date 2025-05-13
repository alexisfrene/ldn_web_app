import React, { useState } from "react";
import { ModalAddVariationImage } from "@modals";
import { CreateVariationCollectionForm } from "@forms";
import { useGetVariationById } from "@hooks/variation-hooks";
import { useDeleteVariationImage } from "@hooks/variation-hooks";
import { AlertModal } from "@common/AlertModal";
import { Icons } from "@common/Icons";
import { TokenImage } from "@common/ImagePrivate";
import { MenuTabs } from "@common/MenuTabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { ScrollArea } from "@ui/scroll-area";
import { TabsContent } from "@ui/tabs";

const tabs = ["Ver imágenes", "Agregar una colección"];

interface Props {
  variationId: string;
}

export const VariationDetailCard: React.FC<Props> = ({ variationId }) => {
  const { variation } = useGetVariationById(variationId);
  const [edit, setEdit] = useState("");

  const mutationRemoveImage = useDeleteVariationImage();
  return (
    <MenuTabs tabs={tabs}>
      {variation && (
        <ScrollArea className="h-96">
          <TabsContent value={tabs[0]}>
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
                    <div className="grid grid-cols-3 gap-2 my-3">
                      {value.images.map((image, index) => (
                        <div className="relative" key={index}>
                          {edit === value.id && (
                            <AlertModal
                              trigger={
                                <Icons
                                  type="trash"
                                  height={25}
                                  className="absolute top-0 right-0 cursor-pointer rounded-tr-sm text-slate-300 hover:text-red-600"
                                />
                              }
                              title="Estas por eliminar una imagen"
                              description="Esta acción no se puede deshacer. ¿Estás seguro de que deseas continuar?"
                              onConfirm={() => {
                                mutationRemoveImage.mutate({
                                  variation_id: variation.variation_id,
                                  collection_id: value.id,
                                  url: image,
                                });
                              }}
                            />
                          )}
                          <TokenImage
                            url={`${image}?width=150&height=150&quality=20&format=webp`}
                            variant="default"
                            className="rounded-lg"
                          />
                        </div>
                      ))}
                      {edit === value.id && (
                        <ModalAddVariationImage
                          label={value.label}
                          variationId={variation.variation_id}
                          collectionId={value.id}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value={tabs[1]}>
            <Card className="h-96">
              <CardHeader>
                <CardTitle>Crear una nueva colección </CardTitle>
              </CardHeader>
              <CardContent>
                <CreateVariationCollectionForm variationId={variationId} />
              </CardContent>
            </Card>
          </TabsContent>
        </ScrollArea>
      )}
    </MenuTabs>
  );
};
