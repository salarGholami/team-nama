// lib/sidebar-store.ts
import { create } from "zustand";

type SidebarState = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  close: () => set({ isOpen: false }),
}));
