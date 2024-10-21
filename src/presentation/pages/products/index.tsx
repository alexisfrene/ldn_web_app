import React from 'react';
import { MenuTabs, TabsContent } from '@components';
import { ProductGrid } from './ViewTab';
import { CreateProducts } from './CreateTab';

const ProductsTabs = ['Stock de productos', 'Crear producto'];

const Products: React.FC = () => {
  return (
    <MenuTabs tabs={ProductsTabs}>
      <TabsContent value={ProductsTabs[0]}>
        <ProductGrid />
      </TabsContent>
      <TabsContent value={ProductsTabs[1]}>
        <CreateProducts />
      </TabsContent>
    </MenuTabs>
  );
};

export default Products;
