import React from "react";
import { ErrorMessage, Formik } from "formik";
import {
  SelectBrand,
  SelectProductAge,
  SelectProductGender,
  SelectProductStyle,
} from "@selects";
import { useModal } from "@hooks";
import {
  Button,
  CardTitle,
  FileUpload,
  InputWithLabel,
  LoadingButton,
  Modal,
  ModalCategory,
  ModalSize,
} from "@components";
import handleSubmit from "./handleSubmit";
import initialValues from "./initialValues";
import validationSchema from "./validationSchema";

export const CreateProductForm: React.FC = () => {
  const { hideModal, isOpenModal, modalContent, modalTitle, showModal } =
    useModal();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, formikHelpers) => {
        handleSubmit(values, formikHelpers);
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
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
          <Button
            className="col-span-full"
            variant="outline"
            type="button"
            onClick={() =>
              showModal(
                "Selecciona una categoría :",
                <ModalCategory
                  onRequestClose={hideModal}
                  handleChange={(value) => {
                    setFieldValue("category", value);
                    hideModal();
                  }}
                  values={values.category}
                  key="category"
                />,
              )
            }
          >
            Seleccionar categoría
          </Button>
          <ErrorMessage name="category" />
          <Button
            className="col-span-full"
            variant="outline"
            type="button"
            onClick={() =>
              showModal(
                "Selecciona un talle/numero :",
                <ModalSize
                  onRequestClose={hideModal}
                  handleChange={(value) => {
                    setFieldValue("size", value);
                    hideModal();
                  }}
                  values={values.size}
                />,
              )
            }
          >
            Selecciona un talle/numero
          </Button>
          <ErrorMessage name="size" />
          <Modal isOpen={isOpenModal} onRequestClose={hideModal}>
            <CardTitle className="text-center">{modalTitle}</CardTitle>
            {modalContent}
          </Modal>
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
