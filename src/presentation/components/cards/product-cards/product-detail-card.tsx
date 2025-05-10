import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getByIdProduct } from "@services";
import { MenuTabs, ScrollArea, TabsContent } from "@components";
import { PrimaryImage } from "./ProductDetail/PrimaryImage";
import { ProductData } from "./ProductDetail/ProductData";
import { StyleData } from "./ProductDetail/StyleData";
import { VariationData } from "./ProductDetail/VariationData";

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
                category={data.category!}
                description={data.description!}
                name={data.name}
                price={data.price.toString()}
                product_id={product_id}
                size={data.size!}
              />
            </ScrollArea>
          </TabsContent>
          <TabsContent value={tabs[1]}>
            <ScrollArea className="h-52">
              <StyleData
                age={data.detail?.age!}
                brand={data.detail?.brand!}
                color={data.detail?.color!}
                gender={data.detail?.gender!}
                product_id={data.product_id!}
                style={data.detail?.style!}
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
