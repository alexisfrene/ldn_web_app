import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useIsMobile, useModal } from '@hooks';
import {
  Button,
  CardTitle,
  Icons,
  Modal,
  ModalCategory,
  ModalSize,
} from '@components';

export const ProductDataTable: React.FC<DataOfProductsProps> = ({
  dataVist,
  initialValues,
  handleSubmit,
  title,
}) => {
  const [modalEdit, setModalEdit] = useState(false);
  const isMobile = useIsMobile();
  const { hideModal, isOpenModal, modalContent, modalTitle, showModal } =
    useModal();
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });

  const btnSize = () => (
    <Button
      className="h-7 w-full max-w-52 bg-slate-300 text-xs hover:bg-slate-400 sm:h-full sm:text-base dark:bg-slate-700"
      variant="outline"
      type="button"
      onClick={() =>
        showModal(
          'Selecciona un talle/numero :',
          <ModalSize
            onRequestClose={hideModal}
            handleChange={(value) => {
              formik.setFieldValue('size', value);
              hideModal();
            }}
            values={formik.values.size}
          />,
        )
      }
    >
      Selecciona un talle/numero
    </Button>
  );

  const btnCategory = () => (
    <Button
      className="h-7 w-full max-w-52 bg-slate-300 text-xs hover:bg-slate-400 sm:h-full sm:text-base dark:bg-slate-700"
      variant="outline"
      type="button"
      onClick={() =>
        showModal(
          'Selecciona una categoría :',
          <ModalCategory
            onRequestClose={hideModal}
            handleChange={(value) => {
              formik.setFieldValue('category', value);
              hideModal();
            }}
            values={formik.values.category}
          />,
        )
      }
    >
      Seleccionar categoría
    </Button>
  );

  useEffect(() => {
    setTimeout(() => setModalEdit(false), 200);
  }, [initialValues]);

  return (
    <>
      <div className="mb-5 flex items-center font-bold sm:text-2xl">
        <Icons
          type={modalEdit ? 'arrow_small_left' : 'copy_manual'}
          height={isMobile ? 20 : 30}
          className="cursor-pointer hover:scale-105 hover:text-slate-800"
          onClick={() => setModalEdit(!modalEdit)}
        />
        <h2 className="ml-2">{title}</h2>
      </div>
      <form onSubmit={formik.handleSubmit}>
        {dataVist.map(({ label, value, name }, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b font-semibold sm:text-xl"
          >
            <label className="px-1 pb-2 text-xs font-bold sm:w-56 sm:text-base">
              {label}
            </label>
            {modalEdit ? (
              <>
                {name === 'size' && btnSize()}
                {name === 'category' && btnCategory()}
                {name !== 'category' && name !== 'size' && (
                  <input
                    name={name}
                    placeholder={value}
                    className="w-52 truncate bg-slate-100 px-1 pb-1 text-xs sm:text-base dark:bg-slate-300"
                    onChange={formik.handleChange}
                    value={formik.values[name]}
                  />
                )}
              </>
            ) : (
              <div className="w-52 truncate px-1 pb-1 text-xs sm:text-base">
                {value ? (
                  value[0] === '#' ? (
                    <span
                      style={{
                        backgroundColor: value,
                        height: '20px',
                        width: '20px',
                        display: 'inline-block',
                        borderRadius: '30%',
                      }}
                    />
                  ) : (
                    value
                  )
                ) : (
                  'No cargado'
                )}
              </div>
            )}
          </div>
        ))}
        <Modal isOpen={isOpenModal} onRequestClose={hideModal}>
          <CardTitle className="text-center">{modalTitle}</CardTitle>
          {modalContent}
        </Modal>
        {modalEdit && (
          <Button type="submit" className="mt-1 w-full px-4 py-2">
            Enviar
          </Button>
        )}
      </form>
    </>
  );
};
