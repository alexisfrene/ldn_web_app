import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Modal,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@components';
import { useModal } from '@hooks';
import { Rows } from './Rows';
import { EditAvatarModal } from '@modals';

const Config: React.FC = () => {
  const { hideModal, isOpenModal, modalContent, showModal, modalTitle } =
    useModal();
  const {
    hideModal: hideSheet,
    isOpenModal: isOpenSheet,
    modalContent: sheetContent,
    modalTitle: sheetTitle,
    showModal: showSheet,
  } = useModal();

  return (
    <Card className="h-full rounded-none border-none shadow-none">
      <CardHeader>Configuración</CardHeader>
      <CardContent className="grid grid-cols-12 gap-6">
        <EditAvatarModal />
        <div className="col-span-11">
          <Rows
            hideModal={hideModal}
            showModal={showModal}
            showSheet={showSheet}
          />
        </div>
      </CardContent>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={hideModal}
        className="max-w-fit"
        title={modalTitle}
      >
        {modalContent}
      </Modal>
      <Sheet open={isOpenSheet} onOpenChange={hideSheet}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>{sheetTitle}</SheetTitle>
            <SheetDescription />
          </SheetHeader>
          {sheetContent}
        </SheetContent>
      </Sheet>
    </Card>
  );
};

export default Config;
