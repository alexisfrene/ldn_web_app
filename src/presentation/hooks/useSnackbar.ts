import { useCallback, useState } from 'react';

type SnackbarType = 'success' | 'error' | 'warning' | '';

interface SnackbarHook {
  hideSnackbar: () => void;
  isOpenSnackbar: boolean;
  snackbarMessage: string;
  snackbarType: SnackbarType;
  showErrorSnackbar: (message: string) => void;
  showSuccessSnackbar: (message: string) => void;
  showWarningSnackbar: (message: string) => void;
}

export function useSnackbar(): SnackbarHook {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<SnackbarType>('');
  const [message, setMessage] = useState('');

  const showSnackbarFn = useCallback(
    (type: SnackbarType) => (message: string) => {
      setIsOpen(true);
      setType(type);
      setMessage(message);
    },
    [setIsOpen, setType, setMessage],
  );

  const hideSnackbar = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
      setType('');
      setMessage('');
    }
  }, [isOpen, setIsOpen, setType, setMessage]);

  return {
    hideSnackbar,
    isOpenSnackbar: isOpen,
    snackbarMessage: message,
    snackbarType: type,
    showErrorSnackbar: showSnackbarFn('error'),
    showSuccessSnackbar: showSnackbarFn('success'),
    showWarningSnackbar: showSnackbarFn('warning'),
  };
}
