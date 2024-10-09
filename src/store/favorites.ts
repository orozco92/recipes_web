import { create } from "zustand";
import { StorageNames } from "./storage-names";
import { devtools, persist } from "zustand/middleware";

interface State {
  favorites: number[];
  setFavorites: (favorites: number[]) => void;
  addToFavorites: (id: number) => void;
  removeFromFavorites: (id: number) => void;
}

export const useFavoritesStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          favorites: [],
          addToFavorites: (id) => {
            const favorites = [...get().favorites];
            favorites.push(id);
            set({ favorites });
          },
          removeFromFavorites: (id) => {
            const favorites = [...get().favorites.filter((item) => item != id)];
            set({ favorites });
          },
          setFavorites: (favorites) => set({ favorites }),
        };
      },
      { name: StorageNames.Favorites }
    )
  )
);
