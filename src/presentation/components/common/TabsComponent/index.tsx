import React, { Suspense } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  Label,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icons,
  LoadingIndicator,
} from '@components';
import { cn } from '@utils';
import { useIsMobile } from '@hooks';

interface TabsProps {
  tabs: {
    path: string;
    label: string;
  }[];
  bgColor?: string;
}

export const TabsComponent: React.FC<TabsProps> = ({ tabs, bgColor }) => {
  const isMobile = useIsMobile();
  const location = useLocation();

  const tabsStyles = cn(
    `flex`,
    'rounded-lg py-4 shadow-md ring-1 dark:bg-slate-700/80 dark:ring-slate-600/60',
    bgColor || 'bg-amber-300/90 ring-amber-400/50',
  );

  return (
    <Card className="border-none">
      <CardHeader>
        <div className={tabsStyles}>
          {isMobile ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex w-full items-center">
                <Icons type="bars3" height={40} className="ml-3" />
                <Label className="w-full align-middle text-xl">
                  {tabs.map((e) =>
                    location.pathname.includes(e.path) ? e.label : '',
                  )}
                </Label>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex w-[90vw] flex-col">
                <DropdownMenuLabel>Selecciona una pestaña</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {tabs.map((tab, index) => (
                  <DropdownMenuItem
                    className="flex flex-col space-y-2"
                    key={index}
                  >
                    <NavLink
                      key={index}
                      to={tab.path}
                      className={(data) =>
                        cn([
                          'w-full rounded-lg px-4 py-2 transition-all duration-300 ease-in-out',
                          data.isActive
                            ? 'bg-amber-500 text-white shadow-lg ring-1 ring-amber-500/70 dark:bg-slate-800 dark:ring-slate-600'
                            : 'bg-amber-400 text-black ring-1 ring-amber-400/70 hover:bg-amber-500/80 dark:bg-slate-700 dark:text-slate-300 dark:ring-slate-500/70 dark:hover:bg-slate-600 dark:hover:ring-slate-500',
                        ])
                      }
                    >
                      <Label className="cursor-pointer text-base font-medium sm:text-lg">
                        {tab.label}
                      </Label>
                    </NavLink>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            tabs.map((tab, index) => (
              <div key={index} className="flex-grow basis-96">
                <NavLink
                  to={tab.path}
                  className={(data) =>
                    cn([
                      'mx-3 flex justify-center rounded-lg p-3 transition-all duration-300 ease-in-out',
                      data.isActive
                        ? 'bg-amber-500 text-white shadow-lg ring-1 ring-amber-500/70 hover:bg-amber-600 dark:bg-slate-600 dark:text-white dark:ring-slate-800/70 hover:dark:bg-slate-500 hover:dark:ring-slate-500/80'
                        : 'bg-amber-400 text-black ring-1 ring-amber-400/70 hover:bg-amber-500/80 dark:bg-slate-700 dark:text-slate-300 dark:ring-slate-500/70 dark:hover:bg-slate-600 dark:hover:ring-slate-500',
                    ])
                  }
                >
                  <Label className="cursor-pointer text-base font-medium sm:text-lg">
                    {tab.label}
                  </Label>
                </NavLink>
              </div>
            ))
          )}
        </div>
      </CardHeader>
      <CardContent className="relative h-[80vh]">
        <Suspense fallback={<LoadingIndicator isLoading />}>
          <Outlet />
        </Suspense>
      </CardContent>
    </Card>
  );
};
