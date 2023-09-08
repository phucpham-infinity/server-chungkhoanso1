import { create } from "zustand";

interface IAppStore {
  user: any;
  isAuthenticated: boolean;
  setUser: (user: any) => any;
}

const useAppStore = create<IAppStore>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
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
