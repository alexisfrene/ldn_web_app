import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getByIdProduct } from '@services';
import { ScrollArea, TabsContent, MenuTabs } from '@components';
import { ProductData } from './ProductData';
import { StyleData } from './StyleData';
import { VariationData } from './VariationData';
import { PrimaryImage } from './PrimaryImage';

const tabs = ['Información', 'Estilos', 'Imágenes'];

interface Props {
  product_id: string;
}
export const ProductDetail: React.FC<Props> = ({ product_id }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['product_details', product_id],
    queryFn: () => getByIdProduct(product_id),
  });

  if (isPending) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <MenuTabs tabs={tabs}>
      {data && (
        <div className="sm:w-[46rem]">
          <PrimaryImage product={data} />
          <ScrollArea className="sm:h-72">
            <TabsContent value={tabs[0]}>
              <ProductData
                category={data.category!}
                description={data.description!}
                name={data.name}
                price={data.price.toString()}
                product_id={product_id}
                size={data.size!}
              />
            </TabsContent>
            <TabsContent value={tabs[1]}>
              <StyleData
                age={data.detail?.age!}
                brand={data.detail?.brand!}
                color={data.detail?.color!}
                gender={data.detail?.gender!}
                product_id={data.product_id!}
                style={data.detail?.style!}
              />
            </TabsContent>
            <TabsContent value={tabs[2]}>
              <VariationData
                variation={data.variation}
                product_id={data.product_id}
              />
            </TabsContent>
          </ScrollArea>
        </div>
      )}
    </MenuTabs>
  );
};
