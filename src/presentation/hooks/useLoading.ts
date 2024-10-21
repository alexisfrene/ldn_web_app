import { useCallback, useState } from 'react';

interface LoadingHook {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

export function useLoading(): LoadingHook {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
  }, [setIsLoading]);

  const stopLoading = useCallback(() => setIsLoading(false), [setIsLoading]);

  return {
    isLoading,
    startLoading,
    stopLoading,
  };
}
