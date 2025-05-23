import React, { useState } from "react";
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
import { Icons } from "@components/common/icons";
import { TokenImage } from "@components/common/image-private";
import { useLinkVariation } from "@products-hooks/use-link-variation";
import { useGetVariations } from "@variations-hooks/use-get-variations";

interface AddVariationsProps {
  product_id: Product["product_id"];
}

export const AddVariations: React.FC<AddVariationsProps> = ({ product_id }) => {
  const [selected, setSelected] = useState<string>("");
  const { variations } = useGetVariations();
  const mutation = useLinkVariation();

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
            {variations.length ? (
              variations.map(
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
