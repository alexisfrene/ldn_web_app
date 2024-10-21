import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import {
  Button,
  CardTitle,
  Icons,
  Modal,
  ModalCategory,
  ModalSize,
} from '@components';
import { useModal } from '@hooks';

export const ProductDataTable: React.FC<DataOfProductsProps> = ({
  dataVist,
  initialValues,
  handleSubmit,
  title,
}) => {
  const [modalEdit, setModalEdit] = useState(false);
  const { hideModal, isOpenModal, modalContent, modalTitle, showModal } =
    useModal();
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });

  const btnSize = () => (
    <Button
      className="w-full bg-slate-300 hover:bg-slate-400 dark:bg-slate-700"
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
      className="w-full bg-slate-300 hover:bg-slate-400 dark:bg-slate-700"
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
          height={30}
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
            <label className="px-1 pb-2 font-bold sm:w-56">{label}</label>
            {modalEdit ? (
              <>
                {name === 'size' && btnSize()}
                {name === 'category' && btnCategory()}
                {name !== 'category' && name !== 'size' && (
                  <input
                    name={name}
                    placeholder={value}
                    className="w-52 truncate bg-slate-100 px-1 pb-1 dark:bg-slate-300"
                    onChange={formik.handleChange}
                    value={formik.values[name]}
                  />
                )}
              </>
            ) : (
              <div className="w-52 truncate px-1 pb-1">
                {value || 'No cargado'}
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
