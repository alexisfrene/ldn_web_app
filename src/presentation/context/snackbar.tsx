import React, { createContext, ReactNode } from 'react';
import { Snackbar } from '@components';
import { useSnackbar } from '@presentation/hooks';

interface SnackbarContextProps {
  showSuccessSnackbar: (message: string) => void;
  showErrorSnackbar: (message: string) => void;
  showWarningSnackbar: (message: string) => void;
}

export const SnackbarContext = createContext<SnackbarContextProps>({
  showSuccessSnackbar: () => {},
  showErrorSnackbar: () => {},
  showWarningSnackbar: () => {},
});

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const {
    isOpenSnackbar,
    snackbarMessage,
    snackbarType,
    showErrorSnackbar,
    showSuccessSnackbar,
    showWarningSnackbar,
    hideSnackbar,
  } = useSnackbar();

  return (
    <SnackbarContext.Provider
      value={{ showSuccessSnackbar, showErrorSnackbar, showWarningSnackbar }}
    >
      {children}
      {isOpenSnackbar && (
        <Snackbar
          message={snackbarMessage}
          type={snackbarType}
          onChange={hideSnackbar}
        />
      )}
    </SnackbarContext.Provider>
  );
};
