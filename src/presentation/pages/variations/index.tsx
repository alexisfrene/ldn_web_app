import React from 'react';
import { MenuTabs, TabsContent } from '@components';
import { VariantsGrid } from './ViewTab';
import { CreateVariation } from './CreateTab';
const imageTabs = ['Ver imágenes', 'Crear Producto'];

const Variations: React.FC = () => {
  return (
    <MenuTabs tabs={imageTabs}>
      <TabsContent value="Ver imágenes">
        <VariantsGrid />
      </TabsContent>
      <TabsContent value="Crear Producto">
        <CreateVariation />
      </TabsContent>
    </MenuTabs>
  );
};

export default Variations;
