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

interface LayoutProps {
  children: ReactNode;
}

const useAvatar = () => {
  const { session_token, avatar, insertAvatar } = useSessionStore((state) => ({
    session_token: state.session_token,
    avatar: state.avatar,
    insertAvatar: state.insertAvatar,
  }));

  useEffect(() => {
    const fetchAvatar = async () => {
      if (session_token && !avatar) {
        const avatarUrl = await getUrlAvatar();
        insertAvatar(avatarUrl);
      }
    };

    fetchAvatar();
  }, [session_token, avatar, insertAvatar]);

  return { avatar, session_token };
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { avatar, session_token } = useAvatar();

  return (
    <SidebarProvider>
      {session_token && <AppSidebar />}
      <main className="flex-1">
        <header className="flex items-center justify-between bg-gradient-to-t from-amber-200 to-amber-400 p-3 dark:from-slate-700 dark:to-slate-900 dark:text-slate-200">
          {session_token && <SidebarTrigger />}
          <div className="flex items-center">
            <ModeToggle />
            {session_token && (
              <Avatar className="mx-5 my-2">
                <AvatarImage src={avatar} alt="User Avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
          </div>
        </header>
        {children}
      </main>
    </SidebarProvider>
  );
};
