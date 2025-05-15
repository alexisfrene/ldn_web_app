import React from "react";
import { useEditProduct } from "src/features/products/hooks/use-edit-product";
import { useGetProductById } from "src/features/products/hooks/use-get-product-by-id";
import { Skeleton } from "@ui/skeleton";
import { ProductDataTable } from "@components/common2/data-table";
import { useGetCategoryByNames } from "@categories-hooks/use-get-category-by-names";
import { useGetSizeByNames } from "@sizes-hooks/use-get-size-by-names";

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
  const mutation = useEditProduct();
  const { product } = useGetProductById(product_id);
  const {
    category_id,
    category_value_id,
    isLoading: isLoadingCategory,
  } = useGetCategoryByNames(category, product_id);
  const {
    size_id,
    size_value_id,
    isLoading: isLoadingSize,
  } = useGetSizeByNames(size, product_id);

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

  if (isLoadingCategory || isLoadingSize) {
    return <Skeleton className="h-96 min-w-md" />;
  }

  return (
    <ProductDataTable
      dataVist={dataVist}
      handleSubmit={(values) =>
        mutation.mutate({
          product_id,
          newDetails: {
            name: values?.name || "",
            price: values?.price || "",
            description: values?.description || "",
            category_id: values?.category?.category_id || "",
            category_value: values?.category?.category_value_id || "",
            size_id: values?.size?.size_id || "",
            size_value: values?.size?.size_value_id || "",
          },
        })
      }
      initialValues={{
        description: product?.description,
        name: product?.name,
        price: product?.price,
        category: {
          category_id,
          category_value_id,
        },
        size: {
          size_id,
          size_value_id,
        },
      }}
      title="Información básica"
    />
  );
};
