import React, { useEffect, useState } from "react";
import { getAllCategories } from "@services";
import { SelectCategory } from "@selects";
import { ModalGeneric } from "./ModalGeneric";

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
  return (
    <SelectCategory />
    // <ModalGeneric
    //   items={categories}
    //   selected={values as any}
    //   onRequestClose={onRequestClose}
    //   handleChange={handleChange as any}
    //   selectedKey="category_id"
    //   selectedValueKey="category_value_id"
    // />
  );
};
