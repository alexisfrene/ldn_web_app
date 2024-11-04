import { TabsComponent } from '@components';
import React from 'react';

const ProductsTabs = [
  {
    path: '/app/products/view',
    label: 'Ver productos',
  },
  {
    path: '/app/products/create-products',
    label: 'Crear producto',
  },
];

const Products: React.FC = () => {
  return <TabsComponent tabs={ProductsTabs} />;
};

export default Products;
