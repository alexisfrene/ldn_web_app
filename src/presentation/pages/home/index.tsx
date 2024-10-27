import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useSessionStore } from '@global';
import { Icons, Layout, LoadingIndicator, ScrollArea } from '@components';
import { cn } from '@utils';

const tabsStyles = 'h-8 sm:h-6 md:h-8 lg:h-10 xl:16 2xl:h-16';

const HomePage: React.FC = () => {
  const session_token = useSessionStore((state) => state.session_token);

  const tabButtons = [
    {
      title: 'Finanzas',
      icon: <Icons type="statistics" className={tabsStyles} />,
      path: '/app/finance',
    },
    {
      title: 'Calendario',
      icon: <Icons type="schedule" className={tabsStyles} />,
      path: '/app/schedule',
    },
    {
      title: 'Productos',
      icon: <Icons type="bag" className={tabsStyles} />,
      path: '/app/products',
    },
    {
      title: 'Variaciones',
      icon: <Icons type="stack" className={tabsStyles} />,
      path: '/app/variations',
    },
    {
      title: 'Ajustes',
      icon: <Icons type="cog_6_tooth" className={tabsStyles} />,
      path: '/app/config',
    },
  ];

  return (
    <Layout>
      {!session_token ? (
        <LoadingIndicator isLoading />
      ) : (
        <div className="grid grid-cols-12 rounded-none">
          <div className="col-span-1 bg-gradient-to-t from-amber-200 to-amber-400 dark:from-slate-700 dark:to-slate-900">
            {tabButtons.map(({ title, icon, path }, index) => (
              <NavLink
                key={index}
                to={path}
                className={(data) =>
                  cn([
                    'flex cursor-pointer flex-col items-center gap-y-1 bg-gradient-to-t p-3 transition-all duration-200 ease-in-out hover:from-amber-300 hover:to-amber-500 hover:shadow-lg dark:hover:from-slate-600 dark:hover:to-slate-800',
                    data.isActive
                      ? 'from-amber-700/40 to-amber-500 dark:from-slate-600 dark:to-slate-600'
                      : 'from-amber-200 to-amber-400 dark:from-slate-700 dark:to-slate-900',
                  ])
                }
              >
                <div>{icon}</div>
                <span className="hidden text-sm font-medium lg:block">
                  {title}
                </span>
              </NavLink>
            ))}
          </div>
          <ScrollArea className="col-span-11 h-[90vh] bg-slate-50 dark:bg-slate-950">
            <Outlet />
          </ScrollArea>
        </div>
      )}
    </Layout>
  );
};

export default HomePage;
