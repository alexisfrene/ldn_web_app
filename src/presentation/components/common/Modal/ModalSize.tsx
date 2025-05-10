import React, { useEffect, useState } from "react";
import { getAllSizes } from "@services";
import { ModalGeneric } from "./ModalGeneric";

interface SizeIds {
  size_id: string;
  size_value_id: string;
}
interface ModalSizeProps {
  onRequestClose: () => void;
  values: SizeIds;
  handleChange: (value: SizeIds) => void;
}

export const ModalSize: React.FC<ModalSizeProps> = ({
  onRequestClose,
  handleChange,
  values,
}) => {
  const [sizes, setSizes] = useState<Size[]>([]);

  const getSizes = async () => {
    const res = await getAllSizes();
    if (res) setSizes(res);
  };

  useEffect(() => {
    getSizes();
  }, []);

  return (
    <ModalGeneric
      items={sizes}
      selected={values}
      onRequestClose={onRequestClose}
      handleChange={handleChange}
      selectedKey="size_id"
      selectedValueKey="size_value_id"
    />
  );
};
