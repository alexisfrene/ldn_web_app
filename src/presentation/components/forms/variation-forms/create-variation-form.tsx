import React, { useState } from 'react';
import { ErrorMessage, Formik } from 'formik';
import {
  Button,
  CardTitle,
  Icons,
  ImageUploader,
  Separator,
  InputWithLabel,
  Modal,
  ModalCategory,
} from '@components';
import { useModal } from '@hooks';
import { handleSubmit } from './handleSubmit';

export const CreateVariationForm: React.FC = () => {
  const [images, setImages] = useState<ImagesValues[]>([]);
  const { hideModal, isOpenModal, modalContent, modalTitle, showModal } =
    useModal();

  return (
    <Formik
      initialValues={{
        category: { category_id: '', category_value_id: '' },
        title: '',
        label: '',
        images: [] as ImagesValues[],
      }}
      onSubmit={async (values, formikHelpers) => {
        await handleSubmit(values, formikHelpers);
        setImages([]);
      }}
    >
      {({ values, handleSubmit, isSubmitting, setFieldValue }) => (
        <form onSubmit={handleSubmit} className="flex flex-col px-10 pt-3">
          <InputWithLabel label="Titulo" name="title" type="text" />
          <InputWithLabel
            label="Nombre de la colección"
            name="label"
            type="text"
          />
          <ImageUploader name="images" images={images} setImages={setImages} />
          <div className="my-3 grid grid-cols-2 gap-3">
            {values.images.map((value: ImagesValues) => {
              return (
                <div key={value.id} className="relative bg-slate-200">
                  <Icons
                    type="close"
                    className="absolute right-0 h-4 cursor-pointer bg-red-500"
                    onClick={() => {
                      const res = values.images.filter(
                        (e: { id: string }) => e?.id !== value.id,
                      );
                      setFieldValue('images', res);
                      setImages(res);
                    }}
                  />
                  <div className="m-1 flex justify-center">
                    <img src={value.url} className="h-[64px] w-[64px]" />
                  </div>
                  <Separator />
                </div>
              );
            })}
          </div>
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
                />,
              )
            }
          >
            Seleccionar categoría
          </Button>
          <ErrorMessage name="category" />
          <Modal isOpen={isOpenModal} onRequestClose={hideModal}>
            <CardTitle className="text-center">{modalTitle}</CardTitle>
            {modalContent}
          </Modal>
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={() => handleSubmit()}
          >
            <div className={`${isSubmitting ? 'relative' : 'hidden'} mx-1 w-5`}>
              {isSubmitting && (
                <Icons type="refresh" className="h-5 animate-spin" />
              )}
            </div>
            Crear producto
          </Button>
        </form>
      )}
    </Formik>
  );
};
