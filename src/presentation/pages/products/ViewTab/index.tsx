import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changePreferenceProductView,
  getPreferenceProductView,
} from "@services";
import { useGetProducts } from "@hooks/product-hooks";
import { useIsMobile } from "@hooks/use-mobile";
import { useModal } from "@hooks/use-modal";
import { Modal } from "@common/Modal";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@ui/menubar";
import { Switch } from "@ui/switch";
import { ProductsGrid } from "./ProductsGrid";
import { ProductsTable } from "./ProductTable";

const ProductGrid: React.FC = () => {
  const { hideModal, isOpenModal, modalContent, showModal, modalTitle } =
    useModal();
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: changePreferenceProductView,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["preference_product_view"],
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
  const { products } = useGetProducts();
  const preferments = useQuery({
    queryKey: ["preference_product_view"],
    queryFn: getPreferenceProductView,
  });

  return (
    <div>
      <Menubar className="mb-3">
        <MenubarMenu>
          <MenubarTrigger>Vista</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem>
              Ver en grilla :
              <Switch
                checked={preferments.data}
                onCheckedChange={() => {
                  mutation.mutate(!preferments.data);
                }}
                className="mx-1"
              />
            </MenubarCheckboxItem>
            <MenubarSeparator />
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      {preferments.data || isMobile ? (
        <ProductsGrid data={products} showModal={showModal} />
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
