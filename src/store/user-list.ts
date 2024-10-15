import { create } from "zustand";
import { Roles } from "../core/enums";
import { devtools } from "zustand/middleware";

interface State {
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (page: number) => void;
  roles: Roles[] | Roles | undefined;
  setRoles: (roles?: Roles[] | Roles) => void;
}
export const useUserListStore = create<State>()(
  devtools((set) => {
    return {
      page: 1,
      pageSize: 25,
      roles: undefined,
      setPage: (page) => set({ page }),
      setPageSize: (pageSize) => set({ pageSize }),
      setRoles: (roles) => set({ roles }),
    };
  })
);
