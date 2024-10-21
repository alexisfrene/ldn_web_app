import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductDataTable } from '@components';
import { handleSubmit } from './handleSubmit';

export interface StyleDataProps {
  style: string;
  brand: string;
  age: string;
  color: string;
  gender: string;
  product_id: string;
}

export const StyleData: React.FC<StyleDataProps> = ({
  age,
  brand,
  color,
  gender,
  product_id,
  style,
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['product_details', product_id],
      });
    },
  });
  const dataVist = [
    {
      label: 'Estilo :',
      value: style,
      name: 'style',
    },
    {
      label: 'Marca :',
      value: brand,
      name: 'brand',
    },
    {
      label: 'Edad :',
      value: age,
      name: 'age',
    },
    {
      label: 'Color :',
      value: color,
      name: 'color',
    },
    {
      label: 'Genero :',
      value: gender,
      name: 'gender',
    },
  ];
  const initialValues = {
    brand: '',
    age: '',
    color: '',
    gender: '',
    styles: '',
    product_id: product_id,
  };

  return (
    <ProductDataTable
      dataVist={dataVist}
      handleSubmit={(values, formikHelpers) =>
        mutation.mutate({ formikHelpers: formikHelpers, values: values })
      }
      initialValues={initialValues}
      title="Detalles del producto"
    />
  );
};
