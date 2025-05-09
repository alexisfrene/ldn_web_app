import React from 'react';
import { ProductCard, ProductDetailCard } from '@cards';
import { useDeleteProduct } from '@hooks';

interface Props {
  data: Product[];
  showModal: (title: string, content: React.ReactElement) => void;
}

export const ProductsGrid: React.FC<Props> = ({ data, showModal }) => {
  const mutation = useDeleteProduct();

  return (
    <div className="flex flex-col gap-3 sm:grid-cols-1 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5">
      {data.length ? (
        data.map((product, index) => {
          return (
            <ProductCard
              key={index}
              handleClick={() => {
                showModal(
                  '',
                  <ProductDetailCard product_id={product.product_id!} />,
                );
              }}
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
