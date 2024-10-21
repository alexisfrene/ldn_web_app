import React, { ReactNode } from 'react';
import { LoadingIndicator } from '@components';
import { useLoading } from '@presentation/hooks';

export const LoadingContext = React.createContext({
  stopLoading: () => {},
  startLoading: () => {},
});

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const { stopLoading, startLoading, isLoading } = useLoading();

  return (
    <LoadingContext.Provider value={{ stopLoading, startLoading }}>
      {children}
      {isLoading && <LoadingIndicator isLoading />}
    </LoadingContext.Provider>
  );
}
