// src/store/authStore.ts
import { create } from "zustand";

// To'g'ri type
interface AuthStore {
  isRegistred: boolean;
  setRegistred: (value: boolean) => void;
}

// Zustand store
const useAuthStore = create<AuthStore>((set) => ({
  isRegistred: false, // boshlang'ich qiymat
  setRegistred: (value) => set({ isRegistred: value }),
}));

export default useAuthStore;
