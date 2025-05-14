import React from "react";
import { ProductCard } from "src/features/products/components/cards/product-card";
import { useDeleteProduct } from "src/features/products/hooks/use-delete-product";

interface Props {
  data: Product[];
}

export const ProductsGrid: React.FC<Props> = ({ data }) => {
  const mutation = useDeleteProduct();

  return (
    <div className="flex flex-col gap-3 sm:grid-cols-1 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5">
      {data.length ? (
        data.map((product, index) => {
          return (
            <ProductCard
              key={index}
              removeProduct={() => {
                mutation.mutate(product.product_id!);
              }}
              product={product}
            />
          );
        })
      ) : (
        <div>No hay productos cargados ...</div>
      )}
    </div>
  );
};
