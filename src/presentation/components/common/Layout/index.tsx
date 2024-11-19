import React, { ReactNode, useEffect } from 'react';
import { useSessionStore } from '@global';
import { getUrlAvatar } from '@services';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  ModeToggle,
  SidebarProvider,
  SidebarTrigger,
} from '@components';
import { AppSidebar } from '../AppSidebar';

interface Props {
  children: ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const insertAvatar = useSessionStore((state) => state.insertAvatar);
  const avatar = useSessionStore((state) => state.avatar);
  const session_token = useSessionStore((state) => state.session_token);
  const getAvatarImage = async () => {
    const res = await getUrlAvatar();
    insertAvatar(res);
  };

  useEffect(() => {
    if (session_token && !avatar) {
      getAvatarImage();
    }
  }, []);
  return (
    <SidebarProvider open={!!session_token}>
      <AppSidebar />
      <main className="flex-1">
        <div className="flex items-center justify-between bg-gradient-to-t from-amber-200 to-amber-400 p-3 dark:from-slate-700 dark:to-slate-900 dark:text-slate-200">
          {session_token && <SidebarTrigger />}
          <div className="flex items-center">
            <ModeToggle />
            {session_token && (
              <Avatar className="mx-5 my-2">
                <AvatarImage src={avatar} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
};
