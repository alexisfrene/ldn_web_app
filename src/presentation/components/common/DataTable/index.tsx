import { useState } from "react";
import { Formik } from "formik";
import { ChoiceCategoryModal } from "@modals";
import { useIsMobile } from "@hooks/use-mobile";
import { useModal } from "@hooks/use-modal";
import { Icons } from "@common/Icons";
import { Modal } from "@common/Modal";
import { ChoiceSizeModal } from "@components/modals/size-modals/choice-size-modal";
import { Button } from "@ui/button";
import { CardTitle } from "@ui/card";
import { Input } from "@ui/input";

export const ProductDataTable: React.FC<DataOfProductsProps> = ({
  dataVist,
  initialValues,
  title,
  handleSubmit,
}) => {
  const [modalEdit, setModalEdit] = useState(false);
  const isMobile = useIsMobile();
  const { hideModal, isOpenModal, modalContent, modalTitle } = useModal();

  return (
    <>
      <div className="mb-5 flex items-center font-bold sm:text-2xl">
        <Icons
          type={modalEdit ? "arrow_small_left" : "copy_manual"}
          height={isMobile ? 20 : 30}
          className="cursor-pointer hover:scale-105 hover:text-slate-800"
          onClick={() => setModalEdit(!modalEdit)}
        />
        <h2 className="ml-2">{title}</h2>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values, setSubmitting);
          setModalEdit(!modalEdit);
        }}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            {dataVist.map(({ label, value, name }) => (
              <div
                key={name}
                className="flex items-center justify-between border-b font-semibold sm:text-xl"
              >
                <label className="px-1 pb-2 text-xs font-bold sm:w-56 sm:text-base">
                  {label}
                </label>
                {modalEdit ? (
                  <div>
                    {name === "size" && <ChoiceSizeModal />}
                    {name === "category" && <ChoiceCategoryModal />}
                    {name !== "category" && name !== "size" && (
                      <Input
                        name={name}
                        placeholder={values[name]}
                        type={name === "price" ? "number" : "text"}
                        onChange={(e) => setFieldValue(name, e.target.value)}
                        className="w-52 truncate bg-slate-100 px-1 pb-1 text-xs sm:text-base dark:bg-slate-300"
                      />
                    )}
                  </div>
                ) : (
                  <div className="w-52 truncate px-1 pb-1 text-xs sm:text-base">
                    {value ? (
                      value[0] === "#" ? (
                        <span
                          style={{
                            backgroundColor: value,
                            height: "20px",
                            width: "20px",
                            display: "inline-block",
                            borderRadius: "30%",
                          }}
                        />
                      ) : (
                        value
                      )
                    ) : (
                      "No cargado"
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
        )}
      </Formik>
    </>
  );
};
