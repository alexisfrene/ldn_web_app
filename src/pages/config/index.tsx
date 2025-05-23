import React from "react";
import { useModal } from "@hooks/use-modal";
import { Card, CardContent, CardHeader } from "@ui/card";
import { Separator } from "@ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@ui/sheet";
import { Modal } from "@components/common/modal";
import { EditAvatarModal } from "@users-modals/edit-avatar-modal";
import { useAvatar } from "@users-hooks/use-avatar";
import { Rows } from "./Rows";

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
            <span>{`Nombre de usuario: ${username}`}</span>
            <Separator />

            <span>{`Correo: ${email}`}</span>
          </div>
        </div>
        <div className="mt-3">
          <Rows
            hideModal={hideModal}
            showModal={showModal}
            showSheet={showSheet}
          />
        </div>
      </CardContent>
      <Modal isOpen={isOpenModal} onRequestClose={hideModal} title={modalTitle}>
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
