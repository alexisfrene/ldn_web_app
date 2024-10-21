import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type State = {
  session_token: string;
  avatar: string;
};

type Action = {
  insertSessionToken: (values: State['session_token']) => void;
  insertAvatar: (url: State['avatar']) => void;
};

export const useSessionStore = create(
  persist<State & Action>(
    (set) => ({
      session_token: '',
      avatar: '',
      insertSessionToken: (session_token) => set({ session_token }),
      insertAvatar: (avatar) => set({ avatar }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
