import { useState } from "react";
import { Formik } from "formik";
import { useIsMobile } from "@hooks/use-mobile";
import { useModal } from "@hooks/use-modal";
import { Button } from "@ui/button";
import { CardTitle } from "@ui/card";
import { Input } from "@ui/input";
import { Icons } from "@components/common/icons";
import { Modal } from "@components/common/modal";
import { ChoiceCategoryModal } from "@categories-modals/choice-category-modal";
import { ChoiceSizeModal } from "@sizes-modals/choice-size-modal";
import { SelectBrand } from "@brands-selects/select-brand";
import { SelectProductAge } from "@products-selects/select-product-age";
import { SelectProductGender } from "@products-selects/select-product-gender";
import { SelectProductStyle } from "@products-selects/select-product-style";

export const ProductDataTable: React.FC<DataOfProductsProps> = ({
  dataVist,
  initialValues,
  title,
  handleSubmit,
}) => {
  const [modalEdit, setModalEdit] = useState(false);
  const isMobile = useIsMobile();
  const { hideModal, isOpenModal, modalContent, modalTitle } = useModal();

  const renderField = (
    name: string,
    value: string,
    values: any,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    switch (name) {
      case "size":
        return <ChoiceSizeModal />;
      case "category":
        return <ChoiceCategoryModal />;
      case "brand":
        return <SelectBrand label="" name="brand" placeholder={value} />;
      case "age":
        return <SelectProductAge label="" name="age" placeholder={value} />;
      case "gender":
        return (
          <SelectProductGender label="" name="gender" placeholder={value} />
        );
      case "style":
        return <SelectProductStyle label="" name="style" placeholder={value} />;
      default:
        return (
          <Input
            name={name}
            placeholder={value}
            value={values[name]}
            type={
              name === "price" ? "number" : name === "color" ? "color" : "text"
            }
            onChange={(e) => setFieldValue(name, e.target.value)}
            className="w-52 truncate bg-slate-100 px-1 pb-1 text-xs sm:text-base dark:bg-slate-300"
          />
        );
    }
  };

  const renderStaticValue = (value: string) => {
    if (!value) return "No cargado";
    if (value[0] === "#") {
      return (
        <span
          style={{
            backgroundColor: value,
            height: "20px",
            width: "20px",
            display: "inline-block",
            borderRadius: "30%",
          }}
        />
      );
    }
    return value;
  };

  return (
    <>
      <div className="mb-5 flex items-center font-bold sm:text-2xl">
        <button
          type="button"
          className="cursor-pointer hover:scale-105 hover:text-slate-800"
          onClick={() => setModalEdit((prev) => !prev)}
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
                key={name ?? ""}
                className="flex items-center justify-between border-b font-semibold sm:text-xl"
              >
                <label className="px-1 pb-2 text-xs font-bold sm:w-56 sm:text-base">
                  {label}
                </label>
                <div className="w-52 truncate px-1 pb-1 text-xs sm:text-base">
                  {modalEdit
                    ? renderField(
                        name ?? "",
                        value ?? "",
                        values,
                        setFieldValue,
                      )
                    : renderStaticValue(value ?? "")}
                </div>
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
