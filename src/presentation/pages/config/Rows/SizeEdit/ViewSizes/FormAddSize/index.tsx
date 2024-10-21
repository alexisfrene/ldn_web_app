import React from 'react';
import { FormAddNew } from './FormAddNew';
import { FormAddNewValue } from './FormAddValue';

interface FormAddSizeProps {
  type?: 'new' | 'value';
  size_id?: string;
}

export const FormAddSize: React.FC<FormAddSizeProps> = ({
  type = 'new',
  size_id,
}) => {
  if (type === 'value' && size_id) return <FormAddNewValue size_id={size_id} />;
  return <FormAddNew />;
};
