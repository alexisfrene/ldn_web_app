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
import { useAvatar, useModal } from '@hooks';
import { Rows } from './Rows';
import { EditAvatarModal } from '@modals';

const Config: React.FC = () => {
  const { username, email } = useAvatar();
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
      <CardContent>
        <div className="flex gap-2">
          <EditAvatarModal />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{username}</span>
            <span className="text-xs text-gray-500">{email}</span>
          </div>
        </div>
        <div>
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
