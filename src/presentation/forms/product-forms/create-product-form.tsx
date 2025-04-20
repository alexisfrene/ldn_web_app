import React, { useState } from 'react';
import { ErrorMessage, Formik } from 'formik';
import defaultImage from '@assets/default.png';
import {
  Button,
  CardTitle,
  Icons,
  ImageUploader,
  ImageLoader,
  LabelInput,
  Modal,
  ModalCategory,
  ModalSize,
  LoadingIndicator,
} from '@components';
import { useModal } from '@hooks';
import handleSubmit from './handleSubmit';
import initialValues from './initialValues';
import validationSchema from './validationSchema';

export const CreateProductForm: React.FC = () => {
  const [image, setImage] = useState<ImagesValues[]>([]);
  const { hideModal, isOpenModal, modalContent, modalTitle, showModal } =
    useModal();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, formikHelpers) => {
        handleSubmit(values, formikHelpers);
        setImage([]);
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
        <form
          onSubmit={handleSubmit}
          className="md:grid-row-6 grid-cols-1 gap-3 p-10 md:grid md:grid-cols-2 xl:grid-cols-4"
        >
          <LabelInput
            label="Nombre del producto"
            name="name"
            maxLength={50}
            minLength={3}
          />
          <LabelInput
            label="Precio"
            name="price"
            inputType="number"
            min={1}
            max={5000000000}
          />
          <div className="col-span-2 row-span-4">
            <div className="mb-3 flex justify-center rounded-md bg-slate-600/50 p-7">
              {values.images[0]?.url ? (
                <ImageLoader
                  url={image[0]?.url}
                  className={`h-[230px] w-[230px] rounded-sm sm:rounded-md ${
                    false && 'border-2 border-dashed border-amber-900'
                  }`}
                  alt="pre-image-product"
                  height={'[230px]'}
                  width={'[230px]'}
                />
              ) : (
                <img
                  src={defaultImage}
                  className="h-[230px] w-[230px] rounded-sm"
                />
              )}
            </div>

            <ImageUploader name="images" images={image} setImages={setImage} />
          </div>
          <LabelInput label="Descripción" name="description" maxLength={100} />
          <LabelInput label="Marca" name="detail[brand]" maxLength={50} />
          <LabelInput label="Estilo" name="detail[style]" maxLength={50} />
          <LabelInput label="Color" name="detail[color]" maxLength={50} />
          <LabelInput label="Edad" name="detail[age]" maxLength={15} />
          <LabelInput label="Genero" name="detail[gender]" maxLength={50} />
          <LabelInput
            label="Unidades"
            name="stock"
            inputType="number"
            max={10000}
            min={1}
          />

          <Button
            className="col-span-full"
            variant="outline"
            type="button"
            onClick={() =>
              showModal(
                'Selecciona una categoría :',
                <ModalCategory
                  onRequestClose={hideModal}
                  handleChange={(value) => {
                    setFieldValue('category', value);
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
                'Selecciona un talle/numero :',
                <ModalSize
                  onRequestClose={hideModal}
                  handleChange={(value) => {
                    setFieldValue('size', value);
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
          <Button
            className="col-span-full"
            type="submit"
            disabled={
              isSubmitting ||
              !image ||
              !values.category.category_id ||
              !values.size.size_id
            }
          >
            <div className="mx-1 w-5">
              {isSubmitting && (
                <Icons type="refresh" className="h-5 animate-spin" />
              )}
            </div>
            Crear producto
          </Button>
          <LoadingIndicator isLoading={isSubmitting} />
        </form>
      )}
    </Formik>
  );
};
