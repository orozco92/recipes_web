import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface State {
  search: string;
  setSearch: (search: string) => void;
}

export const globalSearch = create<State>()(
  devtools((set) => {
    return { search: "", setSearch: (search) => set({ search }) };
  })
);
