import { create } from "zustand";

type PracticeModalState = {
  isOpen: boolean;
};

type PracticeModalActions = {
  open: () => void;
  close: () => void;
};

type PracticeModalStore = PracticeModalState & PracticeModalActions;

const usePracticeModal = create<PracticeModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export { usePracticeModal };
