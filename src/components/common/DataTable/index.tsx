import { useState } from "react";
import { Formik } from "formik";
import { useIsMobile } from "@hooks/use-mobile";
import { useModal } from "@hooks/use-modal";
import { Button } from "@ui/button";
import { CardTitle } from "@ui/card";
import { Input } from "@ui/input";
import { Icons } from "@common/Icons";
import { Modal } from "@common/Modal";
import { ChoiceCategoryModal } from "@categories-modals/choice-category-modal";
import { ChoiceSizeModal } from "@sizes-modals/choice-size-modal";

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
        <button
          type="button"
          className="cursor-pointer hover:scale-105 hover:text-slate-800"
          onClick={() => setModalEdit(!modalEdit)}
        >
          <Icons
            type={modalEdit ? "arrow_small_left" : "copy_manual"}
            height={isMobile ? 20 : 30}
          />
        </button>
        <h2 className="ml-2">{title}</h2>
      </div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue, handleSubmit: formikHandleSubmit }) => (
          <form onSubmit={formikHandleSubmit}>
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
                        type={
                          name === "price"
                            ? "number"
                            : name === "color"
                              ? "color"
                              : "text"
                        }
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
