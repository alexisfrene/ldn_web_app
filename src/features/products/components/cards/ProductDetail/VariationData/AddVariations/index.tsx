import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { linkVariation } from "src/features/products/services";
import { cn } from "@utils";
import { Button } from "@ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@ui/card";
import { ScrollArea } from "@ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui/sheet";
import { Icons } from "@common/icons";
import { TokenImage } from "@common/image-private";
import { LoadingIndicator } from "@common/loading";
import { getAllVariations } from "@variations-services/index";

interface AddVariationsProps {
  product_id: Product["product_id"];
}

export const AddVariations: React.FC<AddVariationsProps> = ({ product_id }) => {
  const [selected, setSelected] = useState<string>("");
  const queryClient = useQueryClient();
  const { isPending, error, data } = useQuery({
    queryKey: ["variations"],
    queryFn: () => getAllVariations(),
  });
  const mutation = useMutation({
    mutationFn: linkVariation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product_details", product_id],
      });
    },
  });
  if (isPending) {
    return <LoadingIndicator isLoading />;
  }
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="mt-3 text-xs sm:text-xl">
        ¿Deseas agregar más imágenes del producto?
      </h3>
      <Sheet>
        <SheetTrigger asChild>
          <Icons
            type="plus_circle"
            height={100}
            className="cursor-pointer text-green-600 hover:text-green-700"
          />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Selecciona una variación :</SheetTitle>
            <SheetDescription>
              Selecciona una variación para tener las imágenes a mano para su
              posterior publication en las redes.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[600px]">
            {data.length ? (
              data.map(
                (e: {
                  title: string;
                  variation_id: string;
                  values: { images: string[]; label: string }[];
                }) => (
                  <Card
                    className={cn([
                      "cursor-pointer select-none p-3",
                      selected === e.variation_id && "bg-slate-300",
                    ])}
                    onClick={() => setSelected(e.variation_id)}
                    key={e.variation_id}
                  >
                    <CardTitle>{e.title}</CardTitle>
                    {e.values.map((e: { images: string[]; label: string }) => {
                      return (
                        <div className="m-1" key={e.label}>
                          <CardDescription>{e.label}</CardDescription>
                          <CardContent className="grid grid-cols-3 gap-2">
                            {e.images.map((image, i) => (
                              <TokenImage
                                url={`${image}?width=60&height=60&quality=50&format=webp`}
                                key={i}
                                variant="default"
                              />
                            ))}
                          </CardContent>
                        </div>
                      );
                    })}
                  </Card>
                ),
              )
            ) : (
              <div>No hay variaciones creadas ...</div>
            )}
            <SheetFooter>
              <SheetClose asChild>
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  type="submit"
                  disabled={!selected || mutation.isPending}
                  onClick={() =>
                    mutation.mutate({
                      variation_id: selected,
                      product_id: product_id || "",
                    })
                  }
                >
                  Guardar cambios
                </Button>
              </SheetClose>
            </SheetFooter>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};
