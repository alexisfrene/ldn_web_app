import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  changePreferenceProductView,
  getAllProducts,
  getPreferenceProductView,
} from '@services';
import {
  LoadingIndicator,
  Modal,
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  MenubarCheckboxItem,
  Switch,
} from '@components';
import { useModal } from '@hooks';
import { ProductsGrid } from './ProductsGrid';
import { ProductsTable } from './ProductTable';

export const ProductGrid: React.FC = () => {
  const { hideModal, isOpenModal, modalContent, showModal, modalTitle } =
    useModal();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: changePreferenceProductView,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['preference_product_view'],
      });
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
  });
  const { isPending, error, data } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => getAllProducts(),
  });
  const preferments = useQuery({
    queryKey: ['preference_product_view'],
    queryFn: getPreferenceProductView,
  });

  if (isPending) return <LoadingIndicator isLoading />;
  if (error) return 'An error has occurred: ' + error.message;

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
      {preferments.data ? (
        <ProductsGrid data={data} hideModal={hideModal} showModal={showModal} />
      ) : (
        <ProductsTable
          data={data}
          hideModal={hideModal}
          showModal={showModal}
        />
      )}
      <Modal
        isOpen={isOpenModal}
        onRequestClose={hideModal}
        className="max-w-fit"
        aria-describedby="modal-description"
        title={modalTitle}
      >
        {modalContent}
      </Modal>
    </div>
  );
};
