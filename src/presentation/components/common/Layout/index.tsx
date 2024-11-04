import React, { ReactNode, useEffect } from 'react';
import logo from '@assets/ldn_icon-70x70.webp';
import { Avatar, AvatarFallback, AvatarImage, ModeToggle } from '@components';
import { useSessionStore } from '@global';
import { getUrlAvatar } from '@services';

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
    <div className="min-h-screen">
      <div className="row-span-1 flex h-[10vh] items-center justify-between bg-gradient-to-t from-amber-200 to-amber-400 dark:from-slate-700 dark:to-slate-900">
        <a
          href="https://www.facebook.com/tiendaLDN/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={logo}
            className="cursor-pointer object-scale-down transition-transform duration-300 ease-in-out hover:rotate-6 hover:scale-110 lg:ml-6"
            alt="logo-ldn"
          />
        </a>
        <div className="m-3 flex items-center">
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
    </div>
  );
};
