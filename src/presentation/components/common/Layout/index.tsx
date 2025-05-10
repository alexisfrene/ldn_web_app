import React, { ReactNode, Suspense } from "react";
import { useAvatar } from "@hooks";
import { AppSidebar } from "../AppSidebar";
import { ModeToggle } from "@common/ModeToggle";
import { SidebarProvider, SidebarTrigger } from "@ui/sidebar";
import { Skeleton } from "@ui/skeleton";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { session_token } = useAvatar();

  return (
    <SidebarProvider>
      {session_token && <AppSidebar />}
      <main className="flex-1 bg-slate-50 dark:bg-slate-950">
        <header className="flex h-[8vh] items-center justify-between bg-linear-to-b from-amber-400 to-amber-500 p-3 dark:from-slate-950 dark:to-slate-900 dark:text-slate-200">
          {session_token && (
            <>
              <SidebarTrigger />
              <div className="flex items-center">
                <ModeToggle />
              </div>
            </>
          )}
        </header>
        <Suspense fallback={<Skeleton className="flex-1" />}>
          {children}
        </Suspense>
      </main>
    </SidebarProvider>
  );
};
