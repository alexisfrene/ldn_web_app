import React from 'react';
import { Button, Icons } from '@components';
import { useTheme } from '../ThemeProvider';

export const ModeToggle: React.FC = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
    >
      <Icons
        type="sun"
        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Icons
        type="moon"
        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
