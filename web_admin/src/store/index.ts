import { create } from "zustand";

interface IAppStore {
  user: any;
  token: string;
  error: any;
  isAuthenticated: boolean;
  setUser: (user: any) => any;
  setError: (error: any) => any;
  setToken: (token: string) => any;
  clear: () => any;
  page: {
    title: string;
  };
}

const useAppStore = create<IAppStore>((set) => ({
  token: "",
  user: null,
  error: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  setToken: (token: string) => set({ token }),
  clear: () => set({ token: "", isAuthenticated: false, user: null }),
  setError: (error) =>
    set({ token: "", isAuthenticated: false, user: null, error }),
  page: {
    title: "Dashboard",
  },
}));

useAppStore.subscribe((state, prevState) => {
  console.log(
    "========== STATE START ==========",
    state,
    "========== STATE END =========="
  );
  console.log(
    "========== PREV STATE START ==========",
    prevState,
    "========== PREV STATE END =========="
  );
});

export default useAppStore;
