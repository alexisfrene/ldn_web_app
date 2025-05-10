import React, { ReactElement } from "react";
import { useGetCategories } from "@hooks";
import { NotCategories } from "@presentation/components/empty-states";
import { ViewCategories } from "./ViewCategories";

interface CategoryEditProps {
  showSheet: (title: string, content: ReactElement) => void;
}

export const CategoryEdit: React.FC<CategoryEditProps> = ({ showSheet }) => {
  const { categories } = useGetCategories();

  return (
    <div className="flex flex-col">
      {!!categories && categories?.length === 0 ? (
        <NotCategories showSheet={showSheet} />
      ) : (
        <ViewCategories showSheet={showSheet} data={categories} />
      )}
    </div>
  );
};
