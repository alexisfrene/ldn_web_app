import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSessionStore } from '@global';
import { Layout, LoadingIndicator, ScrollArea } from '@components';

const HomePage: React.FC = () => {
  const session_token = useSessionStore((state) => state.session_token);

  return (
    <Layout>
      {!session_token ? (
        <LoadingIndicator isLoading />
      ) : (
        <ScrollArea className="h-[90vh] bg-slate-50 dark:bg-slate-950">
          <Outlet />
        </ScrollArea>
      )}
    </Layout>
  );
};

export default HomePage;
