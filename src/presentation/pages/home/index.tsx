import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSessionStore } from '@global';
import Finance from '../finance';
import { Icons, Layout, LoadingIndicator, ScrollArea } from '@components';

const tabImágenes = 'Variaciones';
const tabProductos = 'Productos';
const tabConfig = 'Ajustes';
const tabFinance = 'Finanzas';

const tabsStyles = 'h-8 sm:h-6 md:h-8 lg:h-10 xl:16 2xl:h-16';

const HomePage: React.FC = () => {
  const session_token = useSessionStore((state) => state.session_token);
  const navigate = useNavigate();
  const location = useLocation();

  const tabButtons = [
    {
      title: tabFinance,
      icon: <Icons type="statistics" className={tabsStyles} />,
      navigation: () => navigate('finance'),
    },
    {
      title: tabProductos,
      icon: <Icons type="bag" className={tabsStyles} />,
      navigation: () => navigate('products'),
    },
    {
      title: tabImágenes,
      icon: <Icons type="stack" className={tabsStyles} />,
      navigation: () => navigate('variations'),
    },
    {
      title: tabConfig,
      icon: <Icons type="cog_6_tooth" className={tabsStyles} />,
      navigation: () => navigate('config'),
    },
  ];

  return (
    <Layout>
      {!session_token ? (
        <LoadingIndicator isLoading />
      ) : (
        <div className="grid grid-cols-12 rounded-none bg-gradient-to-t from-amber-200 to-amber-400 dark:from-slate-700 dark:to-slate-900">
          <div className="col-span-1">
            {tabButtons.map(({ title, icon, navigation }, index) => (
              <div
                className="cursor-pointer bg-gradient-to-t from-amber-200 to-amber-400 transition-all duration-200 ease-in-out hover:bg-gradient-to-t hover:from-amber-300 hover:to-amber-500 hover:shadow-lg dark:from-slate-700 dark:to-slate-900"
                key={index}
                onClick={() => navigation()}
              >
                <div className="flex flex-col items-center gap-y-1 p-3">
                  <div>{icon}</div>
                  <span className="hidden text-sm font-medium lg:block">
                    {title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <ScrollArea className="col-span-11 h-[91vh] bg-slate-50 dark:bg-slate-950">
            {location.pathname === '/app' || location.pathname === '/app/' ? (
              <Finance />
            ) : (
              <Outlet />
            )}
          </ScrollArea>
        </div>
      )}
    </Layout>
  );
};

export default HomePage;
