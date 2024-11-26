import React, { ReactNode, Suspense } from 'react';
import {
  ModeToggle,
  SidebarProvider,
  SidebarTrigger,
  Skeleton,
} from '@components';
import { AppSidebar } from '../AppSidebar';
import { useAvatar } from '@hooks';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { session_token } = useAvatar();

  return (
    <SidebarProvider>
      {session_token && <AppSidebar />}
      <main className="flex-1">
        <header className="flex min-h-12 items-center justify-between bg-gradient-to-t from-amber-200 to-amber-400 p-3 dark:from-slate-700 dark:to-slate-900 dark:text-slate-200">
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
