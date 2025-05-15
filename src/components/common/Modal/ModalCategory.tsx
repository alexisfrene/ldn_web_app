import React from "react";
import { SelectCategory } from "@features/categories/components/selects/select-category";

export interface CategoryIds {
  category_id: string;
  category_value_id: string;
}
export interface ModalCategoryProps {
  onRequestClose: () => void;
  handleChange: (value: CategoryIds) => void;
  values: CategoryIds;
}

export const ModalCategory: React.FC<ModalCategoryProps> = ({}) => {
  return <SelectCategory />;
};
