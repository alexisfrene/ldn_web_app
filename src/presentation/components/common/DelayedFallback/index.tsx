import React, { useState, useEffect, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay: number;
}

export const DelayedFallback: React.FC<Props> = ({ children, delay }) => {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowFallback(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return showFallback ? children : null;
};
