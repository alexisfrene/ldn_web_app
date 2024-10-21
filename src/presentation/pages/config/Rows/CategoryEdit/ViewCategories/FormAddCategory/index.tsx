import React from 'react';
import { FormAddNew } from './FormAddNew';
import { FormAddNewValue } from './FormAddValue';

interface FormAddCategoryProps {
  type?: 'new' | 'value';
  category_id?: string;
}

export const FormAddCategory: React.FC<FormAddCategoryProps> = ({
  type = 'new',
  category_id,
}) => {
  if (type === 'value' && category_id)
    return <FormAddNewValue category_id={category_id} />;
  return <FormAddNew />;
};
