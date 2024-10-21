import React from 'react';
import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { VariationCard } from './VariationCard';
import { VariationDetail } from './VariationDetail';
import { deleteVariationById, getAllVariations } from '@services';
import { useModal } from '@hooks';
import { Button, Label, LoadingIndicator, Modal } from '@components';

export const VariantsGrid: React.FC = () => {
  const { hideModal, isOpenModal, modalContent, modalTitle, showModal } =
    useModal();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteVariationById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['variations'],
      });
    },
  });
  const { isPending, error, data } = useQuery({
    queryKey: ['variations'],
    queryFn: () => getAllVariations(),
  });
  if (isPending) {
    return <LoadingIndicator isLoading />;
  }
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="grid min-h-96 grid-cols-2 gap-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
      {data.length ? (
        data.map((variation: Variants) => (
          <VariationCard
            onCLickImage={() => {
              showModal(
                '',
                <VariationDetail variationId={variation.variation_id} />,
              );
            }}
            handleDelete={() =>
              showModal(
                '¿Estás seguro de eliminar esta variación?',
                <div className="flex justify-evenly">
                  <Button variant="outline" type="button" onClick={hideModal}>
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      mutation.mutate(variation.variation_id);
                      hideModal();
                      toast('Variation eliminado');
                    }}
                  >
                    Eliminar
                  </Button>
                </div>,
              )
            }
            variation={variation}
            key={variation.variation_id}
          />
        ))
      ) : (
        <Label>No hay variaciones cargadas...</Label>
      )}
      <Modal
        isOpen={isOpenModal}
        onRequestClose={hideModal}
        className="max-h-fit max-w-7xl"
        title={modalTitle}
      >
        {modalContent}
      </Modal>
    </div>
  );
};
