import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Toast = { id: string; message: string; type?: "success" | "error" | "info" };

type UIStore = {
  activeModal: string | null;
  toasts: Toast[];
  isLoading: boolean;
  setActiveModal: (modal: string | null) => void;
  showToast: (message: string, type?: Toast["type"]) => void;
  hideToast: (id: string) => void;
  setLoading: (v: boolean) => void;
};

export const useUIStore = create<UIStore>((set, get) => ({
  activeModal: null,
  toasts: [],
  isLoading: false,

  setActiveModal: (modal) => set({ activeModal: modal }),

  showToast: (message, type = "info") => {
    const id = Date.now().toString();
    set({ toasts: [...get().toasts, { id, message, type }] });
    setTimeout(() => get().hideToast(id), 3000);
  },

  hideToast: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),

  setLoading: (v) => set({ isLoading: v }),
}));
