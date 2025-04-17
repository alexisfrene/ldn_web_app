import { useCallback, useState } from 'react';

interface ModalState {
  isOpenModal: boolean;
  modalTitle: string;
  modalContent: React.ReactNode | null;
}

interface ModalActions {
  hideModal: () => void;
  showModal: (title?: string, content?: React.ReactNode) => void;
}

type ModalHook = ModalState & ModalActions;

export function useModal(): ModalHook {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<React.ReactNode | null>(null);

  const showModalFn = useCallback(
    (modalTitle?: string, modalContent?: React.ReactNode) => {
      setContent(modalContent);
      setIsOpen(true);
      modalTitle && setTitle(modalTitle);
    },
    [setIsOpen, setTitle],
  );

  const hideModal = useCallback(() => {
    setIsOpen(false);
    setTitle('');
    setContent(null);
  }, [setIsOpen]);

  return {
    hideModal,
    isOpenModal: isOpen,
    modalTitle: title,
    modalContent: content,
    showModal: showModalFn,
  };
}
