import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { Icons } from '@components';
import { cn } from '@lib';

interface SnackbarProps {
  message: string;
  type: 'success' | 'error' | 'warning' | '';
  onChange: () => void;
}

export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  type = 'success',
  onChange,
}) => {
  const [isShowing, setIsShowing] = useState(true);

  const bg = {
    error: {
      light: 'bg-red-500',
      dark: 'bg-red-800',
    },
    success: {
      light: 'bg-green-500',
      dark: 'bg-green-800',
    },
    warning: {
      light: 'bg-amber-500',
      dark: 'bg-amber-800',
    },
  };

  const hover = {
    error: 'hover:bg-red-800',
    success: 'hover:bg-green-800',
    warning: 'hover:bg-amber-800',
  };

  const onClickHandler = () => {
    setIsShowing(false);
    setTimeout(() => onChange(), 500);
  };

  const containerCss = cn(
    'z-100 fixed inset-x-0 bottom-0 mx-auto mb-6 w-4/5 scale-100 rounded',
    type ? bg[type].light : bg['success'].light,
  );

  const iconCss = cn(
    'flex rounded-lg p-2',
    type ? bg[type].dark : bg['success'].dark,
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowing(false);
      setTimeout(() => onChange(), 500);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [onChange]);

  return (
    <Transition
      appear={true}
      show={isShowing}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={containerCss}>
        <div className="mx-auto max-w-7xl px-3 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex w-0 flex-1 items-center">
              <span className={iconCss}>
                <Icons type="megaphone" className="h-6 w-6 text-white" />
              </span>
              <p className="ml-3 truncate font-medium text-white">
                <span className="md:inline">{message}</span>
              </p>
            </div>
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
              <button
                type="button"
                onClick={onClickHandler}
                className={`-mr-1 flex rounded-md p-2 ${
                  type !== '' && hover[type]
                } focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2`}
              >
                <Icons type="close" className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};
