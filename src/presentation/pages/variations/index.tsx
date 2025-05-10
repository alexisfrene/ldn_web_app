import React from "react";
import { TabsComponent } from "@common/TabsComponent";

const VariationsTabs = [
  {
    path: "/app/variations/view",
    label: "Ver imágenes",
  },
  {
    path: "/app/variations/create-variations",
    label: "Crear Variaciones",
  },
];

const Variations: React.FC = () => {
  return <TabsComponent tabs={VariationsTabs} />;
};

export default Variations;
