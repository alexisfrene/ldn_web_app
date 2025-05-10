import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleSubmit } from "./handleSubmit";
import { useForm } from "./useForm";
import { ProductDataTable } from "@common/DataTable";

export interface Props {
  price: string;
  description: string;
  category: string;
  size: string;
  product_id: string;
  name: string;
}

export const ProductData: React.FC<Props> = ({
  name,
  price,
  description,
  category,
  size,
  product_id,
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product_details", product_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
  const dataVist = [
    {
      label: "Nombre :",
      value: name,
      name: "name",
    },
    {
      label: "Precio:",
      value: `$ ${price}`,
      name: "price",
    },
    {
      label: "Descripción:",
      value: description,
      name: "description",
    },
    {
      label: "Categoría:",
      value: category,
      name: "category",
    },
    { label: "Numero/Talle:", value: size, name: "size" },
  ];
  const initialValues = useForm(product_id!);

  return (
    <ProductDataTable
      dataVist={dataVist}
      handleSubmit={(values, formikHelpers) =>
        mutation.mutate({ formikHelpers: formikHelpers, values: values })
      }
      initialValues={initialValues}
      title="Información básica"
    />
  );
};
