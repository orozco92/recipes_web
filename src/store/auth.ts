import { create } from "zustand";
import { Nullable, ProfileUser } from "../core/interfaces";
import { devtools, persist } from "zustand/middleware";
import { StorageNames } from "./storage-names";

interface State {
  token: string | null;
  user: ProfileUser | null;
  setUser: (user: Nullable<ProfileUser>) => void;
  setToken: (token: Nullable<string>) => void;
}

export const useAuthStore = create<State>()(
  devtools(
    persist(
      (set) => {
        return {
          token: null,
          user: null,
          setToken: (token) => set({ token }),
          setUser: (user) => set({ user }),
        };
      },
      { name: StorageNames.Auth }
    )
  )
);
