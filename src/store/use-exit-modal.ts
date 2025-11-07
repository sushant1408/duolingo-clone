import { create } from "zustand";

type ExitModalState = {
  isOpen: boolean;
};

type ExitModalActions = {
  open: () => void;
  close: () => void;
};

type ExitModalStore = ExitModalState & ExitModalActions;

const useExitModal = create<ExitModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export { useExitModal };
