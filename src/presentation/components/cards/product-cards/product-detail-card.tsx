import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getByIdProduct } from "@services";
import { PrimaryImage } from "./ProductDetail/PrimaryImage";
import { ProductData } from "./ProductDetail/ProductData";
import { StyleData } from "./ProductDetail/StyleData";
import { VariationData } from "./ProductDetail/VariationData";
import { MenuTabs } from "@common/MenuTabs";
import { ScrollArea } from "@ui/scroll-area";
import { TabsContent } from "@ui/tabs";

const tabs = ["Información", "Estilos", "Imágenes"];

interface Props {
  product_id: string;
}
export const ProductDetailCard: React.FC<Props> = ({ product_id }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["product_details", product_id],
    queryFn: () => getByIdProduct(product_id),
  });

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <MenuTabs tabs={tabs}>
      {data && (
        <div className="sm:w-[46rem]">
          <PrimaryImage product={data} />
          <TabsContent value={tabs[0]}>
            <ScrollArea className="h-52">
              <ProductData
                category={data.category ?? "Sin categoría"}
                description={data.description ?? "Sin descripción"}
                name={data.name}
                price={data.price?.toString() ?? "0"}
                product_id={product_id}
                size={data.size ?? []}
              />
            </ScrollArea>
          </TabsContent>
          <TabsContent value={tabs[1]}>
            <ScrollArea className="h-52">
              <StyleData
                age={data.detail?.age ?? "Desconocida"}
                brand={data.detail?.brand ?? "Desconocida"}
                color={data.detail?.color ?? "Desconocido"}
                gender={data.detail?.gender ?? "Desconocido"}
                product_id={data.product_id}
                style={data.detail?.style ?? "Desconocido"}
              />
            </ScrollArea>
          </TabsContent>
          <TabsContent value={tabs[2]}>
            <ScrollArea className="h-52">
              <VariationData
                variation={data.variation}
                product_id={data.product_id}
              />
            </ScrollArea>
          </TabsContent>
        </div>
      )}
    </MenuTabs>
  );
};
