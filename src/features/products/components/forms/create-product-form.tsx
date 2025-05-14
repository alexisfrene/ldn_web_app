import React from "react";
import { ErrorMessage, Formik } from "formik";
import { ChoiceCategoryModal } from "@modals";
import {
  SelectBrand,
  SelectProductAge,
  SelectProductGender,
  SelectProductStyle,
} from "@selects";
import { InputWithLabel } from "@common/InputWithLabel";
import { ChoiceSizeModal } from "@components/modals/size-modals/choice-size-modal";
import { FileUpload } from "@ui/file-upload";
import { LoadingButton } from "@ui/loading-button";
import handleSubmit from "./handleSubmit";
import initialValues from "./initialValues";
import validationSchema from "./validationSchema";

export const CreateProductForm: React.FC = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, formikHelpers) => {
        handleSubmit(values, formikHelpers);
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, isSubmitting }) => (
        <form
          onSubmit={handleSubmit}
          className="md:grid-row-6 grid grid-cols-1 gap-3 p-10 md:grid-cols-2 md:grid-rows-4 xl:grid-cols-4"
        >
          <InputWithLabel
            label="Nombre del producto"
            name="name"
            maxLength={50}
            minLength={3}
          />
          <InputWithLabel
            label="Precio"
            name="price"
            type="number"
            min={1}
            max={5000000000}
          />
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
            loading={isSubmitting}
          >
            Crear producto
          </LoadingButton>
        </form>
      )}
    </Formik>
  );
};
