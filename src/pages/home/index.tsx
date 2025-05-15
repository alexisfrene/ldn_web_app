import React from "react";
import { Outlet } from "react-router-dom";
import { useSessionStore } from "src/global";
import { ScrollArea } from "@ui/scroll-area";
import { Layout } from "@common/Layout";
import { LoadingIndicator } from "@common/Loading";

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
