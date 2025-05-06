import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '@components';
import { removeProduct } from '@services';
import { ProductCard, ProductDetailCard } from '@cards';

interface Props {
  data: Product[];
  showModal: (title: string, content: React.ReactElement) => void;
  hideModal: () => void;
}

export const ProductsGrid: React.FC<Props> = ({
  data,
  showModal,
  hideModal,
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: removeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
  });

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
                showModal(
                  'Estas por eliminar este producto ',
                  <div className="flex justify-evenly">
                    <Button variant="outline" type="button" onClick={hideModal}>
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => {
                        mutation.mutate(product.product_id!);
                        hideModal();
                        toast('Producto eliminado');
                      }}
                    >
                      Eliminar
                    </Button>
                  </div>,
                );
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
