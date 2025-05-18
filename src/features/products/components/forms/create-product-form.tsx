import React from "react";
import { ErrorMessage, Formik } from "formik";
import { FileUpload } from "@ui/file-upload";
import { LoadingButton } from "@ui/loading-button";
import { InputWithLabel } from "@components/common/input-with-label";
import { ChoiceCategoryModal } from "@categories-modals/choice-category-modal";
import { ChoiceSizeModal } from "@sizes-modals/choice-size-modal";
import { SelectBrand } from "@brands-selects/select-brand";
import { SelectProductAge } from "@products-selects/select-product-age";
import { SelectProductGender } from "@products-selects/select-product-gender";
import { SelectProductStyle } from "@products-selects/select-product-style";
import { useCreateProduct } from "@products-hooks/use-create-product";
import initialValues from "./initialValues";
import validationSchema from "./validationSchema";

export const CreateProductForm: React.FC = () => {
  const mutation = useCreateProduct();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, formikHelpers) => {
        const product: Product = {
          size_value: values.size.size_value_id,
          size_id: values.size.size_id,
          category_id: values.category.category_id,
          category_value: values.category.category_value_id,
          description: values.description,
          detail: values.detail,
          stock: values.stock,
          name: values.name,
          price: values.price,
          primary_image: values.files[0].file as File,
        };
        mutation.mutate(product);
        formikHelpers.resetForm();
        formikHelpers.setFieldValue("detail[brand]", "");
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, isSubmitting }) => (
        <form
          onSubmit={handleSubmit}
          className="md:grid-row-6 grid grid-cols-1 gap-3  md:grid-cols-2 md:grid-rows-4 xl:grid-cols-4 items-center"
        >
          <InputWithLabel
            label="Nombre del producto"
            name="name"
            maxLength={50}
            minLength={3}
          />
          <InputWithLabel label="Precio" name="price" type="number" min={1} />
          <div className="hidden md:col-span-2 md:row-span-2 md:block">
            <FileUpload maxSizeMB={10} accept="image/*" />
          </div>
          <InputWithLabel
            label="Descripción"
            name="description"
            textarea
            maxLength={100}
            className="md:col-span-2"
          />
          <SelectBrand
            label="Marca"
            name="detail[brand]"
            placeholder="Seleccione una marca"
          />
          <SelectProductStyle
            label="Estilo"
            name="detail[style]"
            placeholder="Seleccione un estilo"
          />
          <InputWithLabel
            label="Color"
            name="detail[color]"
            maxLength={50}
            type="color"
          />
          <SelectProductAge
            label="Edad"
            name="detail[age]"
            placeholder="Seleccione una edad"
          />
          <SelectProductGender
            label="Genero"
            name="detail[gender]"
            placeholder="Seleccione un genero"
          />
          <InputWithLabel
            label="Unidades"
            name="stock"
            type="number"
            max={10000}
            min={1}
          />
          <div className="md:hidden">
            <FileUpload maxSizeMB={10} accept="image/*" />
          </div>
          <ChoiceCategoryModal />
          <ErrorMessage name="category" />
          <ChoiceSizeModal />
          <ErrorMessage name="size" />
          <LoadingButton
            className="col-span-full"
            type="submit"
            disabled={
              isSubmitting ||
              !values.category.category_id ||
              !values.size.size_id
            }
            loading={isSubmitting || mutation.isPending}
          >
            Crear producto
          </LoadingButton>
        </form>
      )}
    </Formik>
  );
};
