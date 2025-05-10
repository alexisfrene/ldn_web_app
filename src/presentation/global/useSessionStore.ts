import { createJSONStorage, persist } from "zustand/middleware";
import { createWithEqualityFn as create } from "zustand/traditional";

type State = {
  session_token: string;
  avatar: string;
  username: string;
  email: string;
};

type Action = {
  insertSessionToken: (values: State["session_token"]) => void;
  insertAvatar: (url: State["avatar"]) => void;
  insertUsername: (username: string) => void;
  insertEmail: (email: string) => void;
};

export const useSessionStore = create(
  persist<State & Action>(
    (set) => ({
      session_token: "",
      avatar: "",
      email: "",
      username: "",
      insertSessionToken: (session_token) => set({ session_token }),
      insertAvatar: (avatar) => set({ avatar }),
      insertUsername: (username) => set({ username }),
      insertEmail: (email) => set({ email }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
