import React from "react";
import { useGetSizes } from "@hooks";
import { NotSizes } from "@presentation/components/empty-states";
import { ViewSizes } from "./ViewSizes";

interface SizeEditProps {
  showSheet: (title: string, content: React.ReactElement) => void;
}

export const SizeEdit: React.FC<SizeEditProps> = ({ showSheet }) => {
  const { sizes } = useGetSizes();

  return (
    <div className="flex flex-col">
      {sizes.length === 0 ? (
        <NotSizes showSheet={showSheet} />
      ) : (
        <ViewSizes showSheet={showSheet} data={sizes} />
      )}
    </div>
  );
};
