import React from "react";
import { CreateVariationModal } from "@variations-modals/create-varition-modal";

export const NotVariations: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 min-h-[50vh] col-span-full">
      <p>No tienes ninguna variación cargada </p>
      <CreateVariationModal />
    </div>
  );
};
