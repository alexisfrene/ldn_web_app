import React from "react";
import { toast } from "sonner";
import { useModal } from "@hooks/use-modal";
import { Button } from "@ui/button";
import { Label } from "@ui/label";
import { Modal } from "@common/Modal";
import { VariationCard } from "@variations-cards/variation-card";
import { VariationDetailCard } from "@variations-cards/variation-detail-card";
import { useDeleteVariation } from "@variations-hooks/use-delete-variation";
import { useGetVariations } from "@variations-hooks/use-get-variations";

const VariantsGrid: React.FC = () => {
  const { variations } = useGetVariations();
  const { hideModal, isOpenModal, modalContent, modalTitle, showModal } =
    useModal();
  const mutation = useDeleteVariation();

  return (
    <div className="flex min-h-96 flex-col gap-3 sm:grid-cols-1 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5">
      {variations.length ? (
        variations.map((variation: Variants) => (
          <VariationCard
            onCLickImage={() => {
              showModal(
                "",
                <VariationDetailCard variationId={variation.variation_id} />,
              );
            }}
            handleDelete={() =>
              showModal(
                "¿Estás seguro de eliminar esta variación?",
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
                      toast("Variation eliminado");
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

export default VariantsGrid;
