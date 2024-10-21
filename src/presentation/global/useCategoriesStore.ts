import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getAllCategories } from '@src/services';

type State = {
  categories: Category[];
};

type Action = {
  insertCategories: (values: State) => void;
  refreshCategories: () => void;
};

export const useCategoriesStore = create(
  persist<State & Action>(
    (set) => ({
      categories: [],
      insertCategories: (state) => set({ categories: state.categories }),
      refreshCategories: async () => {
        const categories = (await getAllCategories()) || [];
        set({ categories });
      },
    }),
    {
      name: 'categories-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
