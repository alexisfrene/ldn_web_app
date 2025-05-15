import React from "react";
import { ProductDataTable } from "@common/DataTable";
import { useEditProductStyles } from "@products-hooks/use-edit-product-styles";
import { useGetProductById } from "@products-hooks/use-get-product-by-id";

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
  const { product } = useGetProductById(product_id);
  const mutation = useEditProductStyles();
  const dataVist = [
    {
      label: "Estilo :",
      value: style,
      name: "style",
    },
    {
      label: "Marca :",
      value: brand,
      name: "brand",
    },
    {
      label: "Edad :",
      value: age,
      name: "age",
    },
    {
      label: "Color :",
      value: color,
      name: "color",
    },
    {
      label: "Genero :",
      value: gender,
      name: "gender",
    },
  ];
  const initialValues = {
    brand: product?.detail?.brand ?? "",
    age: product?.detail?.age ?? "",
    color: product?.detail?.color ?? "",
    gender: product?.detail?.gender ?? "",
    styles: product?.detail?.style ?? "",
    product_id: product_id,
  };

  return (
    <ProductDataTable
      dataVist={dataVist}
      handleSubmit={(values) =>
        mutation.mutate({
          product_id: product_id,
          newDetails: {
            age: values?.age || "",
            brand: values?.brand || "",
            color: values?.color || "",
            gender: values?.gender || "",
            style: values?.style || "",
          },
        })
      }
      initialValues={initialValues}
      title="Detalles del producto"
    />
  );
};
