import React from "react";
import { ScrollArea } from "@ui/scroll-area";
import { TabsContent } from "@ui/tabs";
import { TokenImage } from "@common/image-private";
import { MenuTabs } from "@components/common/menu-tabs";
import { EditProductImageModal } from "@products-modals/edit-product-image-modal";
import { useGetProductById } from "@products-hooks/use-get-product-by-id";
import { ProductData } from "./ProductDetail/ProductData";
import { StyleData } from "./ProductDetail/StyleData";
import { VariationData } from "./ProductDetail/VariationData";

const tabs = ["Información", "Estilos", "Imágenes"];

interface Props {
  product_id: string;
}
export const ProductDetailCard: React.FC<Props> = ({ product_id }) => {
  const { product } = useGetProductById(product_id);

  return (
    <MenuTabs tabs={tabs}>
      {product && (
        <div className="sm:w-[46rem]">
          <div className="flex justify-center rounded-sm py-2">
            <div className="sm:h-60 sm:w-60 flex relative">
              <div className="absolute top-0 right-0">
                <EditProductImageModal product_id={product_id} />
              </div>
              <TokenImage
                url={`${product.primary_image?.toString()}?width=450&height=450&quality=70&format=webp`}
                variant="default"
                className="w-full rounded-md object-cover"
              />
            </div>
          </div>
          <TabsContent value={tabs[0]}>
            <ScrollArea className="h-52">
              <ProductData
                category={product.category ?? "Sin categoría"}
                description={product.description ?? "Sin descripción"}
                name={product.name}
                price={product.price?.toString() ?? "0"}
                product_id={product_id}
                size={product.size ?? "Sin talla"}
              />
            </ScrollArea>
          </TabsContent>
          <TabsContent value={tabs[1]}>
            <ScrollArea className="h-52">
              <StyleData
                age={product.detail?.age ?? "Desconocida"}
                brand={product.detail?.brand ?? "Desconocida"}
                color={product.detail?.color ?? "Desconocido"}
                gender={product.detail?.gender ?? "Desconocido"}
                product_id={product.product_id ?? ""}
                style={product.detail?.style ?? "Desconocido"}
              />
            </ScrollArea>
          </TabsContent>
          <TabsContent value={tabs[2]}>
            <ScrollArea className="h-52">
              <VariationData
                variation={product.variation}
                product_id={product.product_id}
              />
            </ScrollArea>
          </TabsContent>
        </div>
      )}
    </MenuTabs>
  );
};
