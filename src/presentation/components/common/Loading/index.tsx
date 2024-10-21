import React from 'react';

interface Props {
  isLoading: boolean;
}

export const LoadingIndicator: React.FC<Props> = ({ isLoading }) => {
  return (
    isLoading && (
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-slate-300/50 dark:bg-slate-950/50">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
        <p className="ml-2">Cargando...</p>
      </div>
    )
  );
};
