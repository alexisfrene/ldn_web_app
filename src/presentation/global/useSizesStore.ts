import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getAllSizes } from '@src/services';

type State = {
  sizes: Size[];
};

type Action = {
  insertSizes: (values: State) => void;
  refreshSizes: () => void;
};

export const useSizesStore = create(
  persist<State & Action>(
    (set) => ({
      sizes: [],
      insertSizes: (state) => set({ sizes: state.sizes }),
      refreshSizes: async () => {
        const sizes = (await getAllSizes()) || [];
        set({ sizes });
      },
    }),
    {
      name: 'categories-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
