import React, { useEffect, useState } from 'react';
import { getAllCategories } from '@services';
import { ModalGeneric } from './ModalGeneric';

export interface CategoryIds {
  category_id: string;
  category_value_id: string;
}
export interface ModalCategoryProps {
  onRequestClose: () => void;
  handleChange: (value: CategoryIds) => void;
  values: CategoryIds;
}

export const ModalCategory: React.FC<ModalCategoryProps> = ({
  onRequestClose,
  handleChange,
  values,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    const res = await getAllCategories();
    if (res) setCategories(res);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <ModalGeneric
      items={categories}
      selected={values}
      onRequestClose={onRequestClose}
      handleChange={handleChange}
      selectedKey="category_id"
      selectedValueKey="category_value_id"
    />
  );
};
