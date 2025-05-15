import React from "react";
import { useIsMobile } from "@hooks/use-mobile";
import { useModal } from "@hooks/use-modal";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@ui/menubar";
import { Switch } from "@ui/switch";
import { Modal } from "@components/common2/modal";
import { useGetProducts } from "@products-hooks/use-get-products";
import { useChangePreference } from "@users-hooks/use-change-preference";
import { useGetPreferences } from "@users-hooks/use-get-preference";
import { ProductsGrid } from "./ProductsGrid";
import { ProductsTable } from "./ProductTable";

const ProductGrid: React.FC = () => {
  const { hideModal, isOpenModal, modalContent, showModal, modalTitle } =
    useModal();
  const isMobile = useIsMobile();
  const mutation = useChangePreference();
  const { products } = useGetProducts();
  const { preferences } = useGetPreferences();

  return (
    <div>
      <Menubar className="mb-3">
        <MenubarMenu>
          <MenubarTrigger>Vista</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem>
              Ver en grilla :
              <Switch
                checked={preferences}
                onCheckedChange={() => {
                  mutation.mutate(!preferences);
                }}
                className="mx-1"
              />
            </MenubarCheckboxItem>
            <MenubarSeparator />
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      {preferences || isMobile ? (
        <ProductsGrid data={products} />
      ) : (
        <ProductsTable
          data={products}
          hideModal={hideModal}
          showModal={showModal}
        />
      )}
      <Modal
        isOpen={isOpenModal}
        onRequestClose={hideModal}
        className="w-full sm:max-w-fit"
        aria-describedby="modal-description"
        title={modalTitle}
      >
        {modalContent}
      </Modal>
    </div>
  );
};
export default ProductGrid;
